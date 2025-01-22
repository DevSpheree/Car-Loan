package services

import (
	"car-loan-go/config"
	"car-loan-go/models"
	"car-loan-go/repositories"
	"context"
	"fmt"
)

var applicationRepo = repositories.ApplicationRepository{}

func GetMyApplications(ctx context.Context, userID string) ([]models.Application, error) {
    if err := validateUserRole(ctx, userID); err != nil {
        return nil, err
    }

    applications, err := applicationRepo.GetMyApplications(ctx, userID)
    if err != nil {
        return nil, fmt.Errorf("error fetching applications: %v", err)
    }

    return applications, nil
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

func UpdateApplicationStatus(ctx context.Context, id string, status string) error {
    // Create temporary Application to validate status
    tempApp := &models.Application{
        Status: status,
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

    return applicationRepo.UpdateStatus(ctx, id, status)
}