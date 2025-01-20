package repositories

import (
	"car-loan-go/config"
	"car-loan-go/models"
	"context"

	"cloud.google.com/go/firestore"
	"google.golang.org/api/iterator"
)

type VehicleRepository struct{}

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

func (r *VehicleRepository) Create(ctx context.Context, vehicle *models.Vehicle) (string, error) {
    client := config.GetFirestoreClient(ctx)
    defer client.Close()

    var docRef *firestore.DocumentRef
    if vehicle.ID != "" {
        docRef = client.Collection("vehicles").Doc(vehicle.ID)
        _, err := docRef.Set(ctx, vehicle)
        if err != nil {
            return "", err
        }
        return vehicle.ID, nil
    }

    doc, _, err := client.Collection("vehicles").Add(ctx, vehicle)
    if err != nil {
        return "", err
    }
    return doc.ID, nil
}
