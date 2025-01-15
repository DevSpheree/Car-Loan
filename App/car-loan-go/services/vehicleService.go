package services

import (
	"car-loan-go/models"
	"car-loan-go/repositories"
	"context"
	"github.com/go-playground/validator/v10"
)

var vehicleRepo = repositories.VehicleRepository{}

func GetAllVehicles(ctx context.Context) ([]models.Vehicle, error) {
	return vehicleRepo.GetAll(ctx)
}

var validate = validator.New()

func CreateVehicle(ctx context.Context, vehicle *models.Vehicle) (string, error) {
    if err := validate.Struct(vehicle); err != nil {
        return "", err
    }

    return vehicleRepo.Create(ctx, vehicle)
}
