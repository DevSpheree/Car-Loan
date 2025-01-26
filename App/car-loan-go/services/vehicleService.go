package services

import (
	"car-loan-go/config"
	"car-loan-go/models"
	"car-loan-go/repositories"
	"context"
	"fmt"
	"mime/multipart"

	"cloud.google.com/go/firestore"
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

func UpdateVehicleImage(ctx context.Context, vehicleID string, file *multipart.FileHeader) error {
    client := config.GetFirestoreClient(ctx)
    defer client.Close()

    vehicleDoc, err := client.Collection("vehicles").Doc(vehicleID).Get(ctx)
    if err != nil {
        return fmt.Errorf("error obteniendo el vehiculo: %v", err)
    }

    var vehicle models.Vehicle
    if err := vehicleDoc.DataTo(&vehicle); err != nil {
        return fmt.Errorf("error parseando los datos del vehiculo: %v", err)
    }

    if vehicle.ImgURL != "" {
        if err := deleteImageFromStorage(ctx, vehicle.ImgURL); err != nil {
            return err
        }
    }

    imageURL, err := UploadVehicleImage(ctx, file, vehicleID)
    if err != nil {
        return fmt.Errorf("error subiendo imagen: %v", err)
    }

    _, err = client.Collection("vehicles").Doc(vehicleID).Update(ctx, []firestore.Update{
        {
            Path:  "img_url",
            Value: imageURL,
        },
    })

    return err
}