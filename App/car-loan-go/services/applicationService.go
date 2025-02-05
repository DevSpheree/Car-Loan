package services

import (
	"car-loan-go/config"
	"car-loan-go/models"
	"car-loan-go/repositories"
	"context"
	"fmt"
	"mime/multipart"

	"cloud.google.com/go/firestore"
	"google.golang.org/api/iterator"
)

var applicationRepo = repositories.ApplicationRepository{}

func GetMyApplications(ctx context.Context, userID string) ([]models.Application, error) {
	client := config.GetFirestoreClient(ctx)
	defer client.Close()

	userRole, err := getUserRole(ctx, userID)
	if err != nil {
		return nil, fmt.Errorf("error validando el rol del usuario: %v", err)
	}

	if userRole == "ADMIN" {
		iter := client.Collection("applications").Documents(ctx)
		var applications []models.Application

		for {
			doc, err := iter.Next()
			if err == iterator.Done {
				break
			}
			if err != nil {
				return nil, fmt.Errorf("error fetching applications: %v", err)
			}

			var application models.Application
			if err := doc.DataTo(&application); err != nil {
				return nil, err
			}
			application.ID = doc.Ref.ID

			// Get vehicle info
			vehicleDoc, err := client.Collection("vehicles").Doc(application.VehicleID).Get(ctx)
			if err != nil {
				return nil, err
			}
			var vehicle models.Vehicle
			if err := vehicleDoc.DataTo(&vehicle); err != nil {
				return nil, err
			}
			application.VehicleName = vehicle.Brand + " " + vehicle.BrandYear

			// Get client info
			clientDoc, err := client.Collection("users").Doc(application.ClientID).Get(ctx)
			if err != nil {
				return nil, err
			}
			var clientData models.User
			if err := clientDoc.DataTo(&clientData); err != nil {
				return nil, err
			}
			application.Client = &clientData

			applications = append(applications, application)
		}
		return applications, nil
	}

	if userRole != "CLIENT" {
		return nil, fmt.Errorf("user with ID %s must have CLIENT or ADMIN role", userID)
	}

	return applicationRepo.GetMyApplications(ctx, userID)
}

func CreateApplication(ctx context.Context, application *models.Application) (string, error) {
	application.Status = "PENDIENTE"
	application.ReturnStatus = "NO_FINALIZADA"

	if err := validate.Struct(application); err != nil {
		return "", err
	}

	if err := vehicleRepo.Exists(ctx, application.VehicleID); err != nil {
		return "", err
	}

	if application.DriverID != "" {
		if err := driverRepo.Exists(ctx, application.DriverID); err != nil {
			return "", err
		}
	}

	applications, err := applicationRepo.GetMyApplications(ctx, application.ClientID)
	if err != nil {
		return "", fmt.Errorf("error obteniendo las solicitudes del usuario: %v", err)
	}
	for _, app := range applications {
		if app.Status == "PENDIENTE" {
			return "", fmt.Errorf("el usuario con ID: %s ya tiene una solicitud pendiente: %s", application.ClientID, app.ID)
		}

		if app.ReturnStatus == "NO_FINALIZADA" {
			return "", fmt.Errorf("el usuario con ID: %s ya tiene una solicitud en curso: %s", application.ClientID, app.ID)
		}
	}

	userRole, err := getUserRole(ctx, application.ClientID)
	if err != nil {
		return "", fmt.Errorf("error validando el rol del usuario: %v", err)
	}
	if userRole != "CLIENT" {
		return "", fmt.Errorf("el usuario con ID: %s debe tener rol de cliente", application.ClientID)
	}

	return applicationRepo.Create(ctx, application)
}

func getUserRole(ctx context.Context, userID string) (string, error) {
	client := config.GetFirestoreClient(ctx)
	defer client.Close()

	userDoc, err := client.Collection("users").Doc(userID).Get(ctx)
	if err != nil || !userDoc.Exists() {
		return "", fmt.Errorf("usuario con ID %s no encontrado", userID)
	}

	var userData models.User
	if err := userDoc.DataTo(&userData); err != nil {
		return "", fmt.Errorf("error obteniendo los datos del usuario: %v", err)
	}

	return userData.Role, nil
}

func DeleteApplication(ctx context.Context, id string) error {
	client := config.GetFirestoreClient(ctx)
	defer client.Close()

	_, err := client.Collection("applications").Doc(id).Delete(ctx)
	return err
}

func UpdateApplicationPermissionURL(ctx context.Context, id string, url string) error {
	client := config.GetFirestoreClient(ctx)
	defer client.Close()

	_, err := client.Collection("applications").Doc(id).Update(ctx, []firestore.Update{
		{
			Path:  "permission_file_url",
			Value: url,
		},
	})
	return err
}

func UpdateApplicationStatus(
	ctx context.Context,
	userId string,
	application_id string,
	status string,
	rejectionReason string,
	cancelReason string) error {

	tempApp := &models.Application{
		Status:          status,
		RejectionReason: rejectionReason,
		CancelReason:    cancelReason,
	}

	if err := validate.StructPartial(tempApp, "Status"); err != nil {
		return fmt.Errorf("estado invalido: %v", err)
	}

	exists, err := applicationRepo.Exists(ctx, application_id)
	if err != nil {
		return fmt.Errorf("error checking application: %v", err)
	}
	if !exists {
		return fmt.Errorf("application with ID %s not found", application_id)
	}

	userRole, err := getUserRole(ctx, userId)
	if err != nil {
		return fmt.Errorf("error obteniendo el rol del usuario: %v", err)
	}

	if userRole == "CLIENT" {
		if status != "CANCELADA" {
			return fmt.Errorf("el cliente solo puede cancelar solicitudes")
		}
		if cancelReason == "" {
			return fmt.Errorf("el motivo de la cancelacion es requerido")
		}
		return applicationRepo.UpdateStatus(ctx, application_id, status, cancelReason)
	}

	if userRole == "ADMIN" {
		if status == "RECHAZADA" {
			if rejectionReason == "" {
				return fmt.Errorf("la razon de rechazo es requerida")
			}
			return applicationRepo.UpdateStatus(ctx, application_id, status, rejectionReason)
		}
		// Si el admin aprueba la solicitud
		if status == "APROBADA" {
			return applicationRepo.UpdateStatus(ctx, application_id, status, "")
		}
	}

	return fmt.Errorf("operación no permitida para el rol %s", userRole)
}

func UpdateApplication(
	ctx context.Context,
	applicationID string,
	userID string,
	application *models.Application,
	file *multipart.FileHeader) (*models.Application, error) {
	exists, err := applicationRepo.Exists(ctx, applicationID)
	if err != nil {
		return nil, fmt.Errorf("error verificando la solicitud: %v", err)
	}
	if !exists {
		return nil, fmt.Errorf("solicitud con ID %s no encontrada", applicationID)
	}

	userRole, err := getUserRole(ctx, userID)
	if err != nil {
		return nil, fmt.Errorf("error obteniendo el rol del usuario: %v", err)
	}

	// Si es cliente, solo puede cancelar la solicitud
	if userRole == "CLIENT" {
		if application.Status != "CANCELADA" {
			return nil, fmt.Errorf("el cliente solo puede cancelar solicitudes")
		}
		if application.CancelReason == "" {
			return nil, fmt.Errorf("el motivo de la cancelación es requerido")
		}
		// Solo actualizamos el estado y la razón de cancelación
		return applicationRepo.Update(ctx, applicationID, &models.Application{
			Status:       application.Status,
			CancelReason: application.CancelReason,
		})
	}

	// Si no es admin, no puede actualizar
	if userRole != "ADMIN" {
		return nil, fmt.Errorf("solo los administradores pueden actualizar las solicitudes")
	}

	// Si hay archivo nuevo, procesarlo
	if file != nil {
		fileURL, err := UploadPermissionFile(ctx, file, applicationID)
		if err != nil {
			return nil, fmt.Errorf("error al subir el archivo: %v", err)
		}
		application.PermissionFileURL = fileURL
	}

	// Validaciones para el admin
	if application.Status != "" {
		switch application.Status {
		case "RECHAZADA":
			if application.RejectionReason == "" {
				return nil, fmt.Errorf("la razón de rechazo es requerida")
			}
		case "APROBADA":
			// No necesita razón
		default:
			return nil, fmt.Errorf("estado inválido: %s", application.Status)
		}
	}

	// Validar el resto de campos
	if err := validate.StructPartial(application); err != nil {
		return nil, fmt.Errorf("error de validación: %v", err)
	}

	// Verificar que el vehículo existe si se está actualizando
	if application.VehicleID != "" {
		if err := vehicleRepo.Exists(ctx, application.VehicleID); err != nil {
			return nil, err
		}
	}

	// Verificar que el conductor existe si se está actualizando
	if application.DriverID != "" {
		if err := driverRepo.Exists(ctx, application.DriverID); err != nil {
			return nil, err
		}
	}

	return applicationRepo.Update(ctx, applicationID, application)
}
