package services

import (
	"car-loan-go/models"
	"car-loan-go/repositories"
	"context"
)

var vehicleRepo = repositories.VehicleRepository{}

func GetAllVehicles(ctx context.Context) ([]models.Vehicle, error) {
	return vehicleRepo.GetAll(ctx)
}

