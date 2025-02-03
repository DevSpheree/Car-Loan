package services

import (
	"car-loan-go/models"
	"car-loan-go/repositories"
	"context"
)

var driverRepo = repositories.DriverRepository{}

func GetAllDrivers(ctx context.Context) ([]models.Driver, error) {
	return driverRepo.GetAll(ctx)
}