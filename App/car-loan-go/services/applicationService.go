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

    // Get user role
    userDoc, err := client.Collection("users").Doc(userID).Get(ctx)
    if err != nil || !userDoc.Exists() {
        return nil, fmt.Errorf("user with ID %s not found", userID)
    }

    var userData models.User
    if err := userDoc.DataTo(&userData); err != nil {
        return nil, fmt.Errorf("error getting user data: %v", err)
    }

    // For ADMIN users, get all applications
    if userData.Role == "ADMIN" {
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

    // For CLIENT role, validate and get only their applications
    if userData.Role != "CLIENT" {
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

    if err := validateUserRole(ctx, application.ClientID); err != nil {
        return "", err
    }

    return applicationRepo.Create(ctx, application)
}

func validateUserRole(ctx context.Context, userID string) error {
    client := config.GetFirestoreClient(ctx)
    defer client.Close()

    clientDoc, err := client.Collection("users").Doc(userID).Get(ctx)
    if err != nil || !clientDoc.Exists() {
        return fmt.Errorf("client with ID %s not found", userID)
    }

    var clientData models.User
    if err := clientDoc.DataTo(&clientData); err != nil {
        return fmt.Errorf("error getting client data: %v", err)
    }

    if clientData.Role != "CLIENT" {
        return fmt.Errorf("client with ID %s must have CLIENT role", userID)
    }
    return nil
}

func UpdateApplicationStatus(ctx context.Context, id string, status string, rejectionReason string) error {
    tempApp := &models.Application{
        Status:          status,
        RejectionReason: rejectionReason,
    }
    
    if err := validate.StructPartial(tempApp, "Status"); err != nil {
        return fmt.Errorf("invalid status: %v", err)
    }

    exists, err := applicationRepo.Exists(ctx, id)
    if err != nil {
        return fmt.Errorf("error checking application: %v", err)
    }
    if !exists {
        return fmt.Errorf("application with ID %s not found", id)
    }

    var rejectionReasonPtr *string
    if status == "RECHAZADA" {
        if rejectionReason == "" {
            return fmt.Errorf("rejection reason is required when status is RECHAZADA")
        }
        rejectionReasonPtr = &rejectionReason
    }

    return applicationRepo.UpdateStatus(ctx, id, status, rejectionReasonPtr)
}