package repositories

import (
	"car-loan-go/config"
	"car-loan-go/models"
	"context"

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

        var application models.Application
        if err := doc.DataTo(&application); err != nil {
            return nil, err
        }
        application.ID = doc.Ref.ID
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
