package services

import (
	"car-loan-go/config"
	"car-loan-go/models"
	"car-loan-go/repositories"
	"context"
	"fmt"

	"github.com/go-playground/validator/v10"
)

var vehicleRepo = repositories.VehicleRepository{}
var validate = validator.New()

func GetAllVehicles(ctx context.Context) ([]models.Vehicle, error) {
	return vehicleRepo.GetAll(ctx)
}

func CreateVehicle(ctx context.Context, vehicle *models.Vehicle) (string, error) {
    if err := validate.Struct(vehicle); err != nil {
        return "", err
    }

    return vehicleRepo.Create(ctx, vehicle)
}

func validateVehicleExists(ctx context.Context, vehicleID string) error {
    client := config.GetFirestoreClient(ctx)
    defer client.Close()

    vehicleDoc, err := client.Collection("vehicles").Doc(vehicleID).Get(ctx)
    if err != nil || !vehicleDoc.Exists() {
        return fmt.Errorf("vehicle with ID %s not found", vehicleID)
    }
    return nil
}