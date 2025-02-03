package services

import (
	"car-loan-go/config"
	"car-loan-go/models"
	"car-loan-go/repositories"
	"context"
	"fmt"

	"cloud.google.com/go/firestore"
)

var returnRepo = repositories.ReturnRepository{}

func GetAllReturns(ctx context.Context) ([]models.Return, error) {
	returns, err := returnRepo.GetAll(ctx)
	if err != nil {
		return nil, err
	}
	return returns, nil
}

func CreateReturn(ctx context.Context, ret *models.Return) (string, error) {
	if err := validate.Struct(ret); err != nil {
		return "", fmt.Errorf("invalid return data: %v", err)
	}

	client := config.GetFirestoreClient(ctx)
	defer client.Close()

	applicationRef := client.Collection("applications").Doc(ret.ApplicationID)
	applicationDoc, err := applicationRef.Get(ctx)
	if err != nil {
		return "", fmt.Errorf("application ID %s does not exist", ret.ApplicationID)
	}

	returnIter := client.Collection("returns").Where("application_id", "==", ret.ApplicationID).Documents(ctx)
	defer returnIter.Stop()

	doc, err := returnIter.Next()
	if err == nil && doc != nil {
		return "", fmt.Errorf("a return already exists for application ID: %s", ret.ApplicationID)
	}

	var application models.Application
	if err := applicationDoc.DataTo(&application); err != nil {
		return "", fmt.Errorf("error getting application data: %v", err)
	}

	if application.Status != "APROBADA" {
		return "", fmt.Errorf(
			"cannot create return: application status must be APROBADA, current status: %s", application.Status)
	}

	returnID, err := returnRepo.Create(ctx, ret)
	if err != nil {
		return "", fmt.Errorf("error creating return: %v", err)
	}

	_, err = applicationRef.Update(ctx, []firestore.Update{
		{
			Path:  "return_status",
			Value: "FINALIZADA",
		},
	})
	if err != nil {
		if _, deleteErr := client.Collection("returns").Doc(returnID).Delete(ctx); deleteErr != nil {
			return "", fmt.Errorf("critical error: return created but application not updated. Manual fix required. Return ID: %s", returnID)
		}
		return "", fmt.Errorf("error updating application status: %v", err)
	}

	return returnID, nil
}
