package repositories

import (
	"car-loan-go/config"
	"car-loan-go/models"
	"context"

	"google.golang.org/api/iterator"
)

type VehicleRepository struct{}

// GetAll obtiene todos los vehículos
func (r *VehicleRepository) GetAll(ctx context.Context) ([]models.Vehicle, error) {
	client := config.GetFirestoreClient(ctx)
	defer client.Close()

	var vehicles []models.Vehicle
	iter := client.Collection("vehicles").Documents(ctx)
	for {
		doc, err := iter.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return nil, err
		}

		var vehicle models.Vehicle
		if err := doc.DataTo(&vehicle); err != nil {
			return nil, err
		}
		vehicle.ID = doc.Ref.ID 
		vehicles = append(vehicles, vehicle)
	}

	return vehicles, nil
}
