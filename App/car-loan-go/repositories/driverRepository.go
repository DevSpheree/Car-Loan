package repositories

import (
	"car-loan-go/config"
	"car-loan-go/models"
	"context"
	"fmt"

	"google.golang.org/api/iterator"
)

type DriverRepository struct{}

func (r *DriverRepository) GetAll(ctx context.Context) ([]models.Driver, error) {
	client := config.GetFirestoreClient(ctx)
	defer client.Close()

	var drivers []models.Driver
	iter := client.Collection("drivers").Documents(ctx)

	for {
		doc, err := iter.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return nil, err
		}

		var driver models.Driver
		if err := doc.DataTo(&driver); err != nil {
			return nil, err
		}
		driver.ID = doc.Ref.ID
		drivers = append(drivers, driver)
	}

	return drivers, nil
}

func (r *DriverRepository) Exists(ctx context.Context, driverID string) error {
	client := config.GetFirestoreClient(ctx)
	defer client.Close()

	doc, err := client.Collection("drivers").Doc(driverID).Get(ctx)
	if err != nil || !doc.Exists() {
        return fmt.Errorf("driver with ID %s not found", driverID)
    }

	return nil
}