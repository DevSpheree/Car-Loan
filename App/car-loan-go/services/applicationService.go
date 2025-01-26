package services

import (
	"car-loan-go/config"
	"car-loan-go/models"
	"car-loan-go/repositories"
	"context"
	"fmt"

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

	if err := validateVehicleExists(ctx, application.VehicleID); err != nil {
		return "", err
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

// En services/applicationService.go
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
