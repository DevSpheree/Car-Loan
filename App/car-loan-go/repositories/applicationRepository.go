package repositories

import (
	"car-loan-go/config"
	"car-loan-go/models"
	"context"

	"cloud.google.com/go/firestore"
	"google.golang.org/api/iterator"
)

type ApplicationRepository struct{}

func (r *ApplicationRepository) GetMyApplications(ctx context.Context, userID string) ([]models.Application, error) {
    client := config.GetFirestoreClient(ctx)
    defer client.Close()

    var applications []models.Application
    iter := client.Collection("applications").Where("client_id", "==", userID).Documents(ctx)

    for {
        doc, err := iter.Next()
        if err == iterator.Done {
            break
        }
        if err != nil {
            return nil, err
        }

        //Solicitud
        var application models.Application
        if err := doc.DataTo(&application); err != nil {
            return nil, err
        }
        application.ID = doc.Ref.ID

        //Vehículo
        vehicleDoc, err := client.Collection("vehicles").Doc(application.VehicleID).Get(ctx)
        if err != nil {
            return nil, err
        }

        var vehicle models.Vehicle
        if err := vehicleDoc.DataTo(&vehicle); err != nil {
            return nil, err
        }

        application.VehicleName = vehicle.Brand + " " + vehicle.BrandYear

        //Cliente
        clientDoc, err := client.Collection("users").Doc(application.ClientID).Get(ctx)
        if err != nil {
            return nil, err
        }

        var client models.User
        if err := clientDoc.DataTo(&client); err != nil {
            return nil, err
        }

        application.Client = &client

        applications = append(applications, application)
    }

    return applications, nil
}

func (r *ApplicationRepository) Create(ctx context.Context, application *models.Application) (string, error) {
	client := config.GetFirestoreClient(ctx)
	defer client.Close()

	doc, _, err := client.Collection("applications").Add(ctx, application)
	if err != nil {
		return "", err
	}
	return doc.ID, nil
}

func (r *ApplicationRepository) UpdateStatus(ctx context.Context, id string, status string, reason string) error {
    client := config.GetFirestoreClient(ctx)
    defer client.Close()

    updates := []firestore.Update{
        {
            Path:  "status",
            Value: status,
        },
    }

    switch status {
    case "RECHAZADA":
        updates = append(updates, firestore.Update{
            Path:  "rejection_reason",
            Value: reason,
        }, firestore.Update{
            Path:  "return_status",
            Value: "FINALIZADA",
        })
    case "CANCELADA":
        updates = append(updates, firestore.Update{
            Path:  "cancel_reason",
            Value: reason,
        }, firestore.Update{
            Path:  "return_status",
            Value: "FINALIZADA",
        })
    }

    _, err := client.Collection("applications").Doc(id).Update(ctx, updates)
    return err
}

func (r *ApplicationRepository) Exists(ctx context.Context, id string) (bool, error) {
	client := config.GetFirestoreClient(ctx)
	defer client.Close()

	doc, err := client.Collection("applications").Doc(id).Get(ctx)
	if err != nil {
		return false, err
	}
	return doc.Exists(), nil
}
