package services

import (
	"car-loan-go/models"
	"car-loan-go/repositories"
	"context"
	"fmt"
	"strings"
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

    applicationRepo := &repositories.ApplicationRepository{}
    exists, err := applicationRepo.Exists(ctx, ret.ApplicationID)
    if err != nil {
        // Check if it's a "not found" error
        if strings.Contains(err.Error(), "not found") {
            return "", fmt.Errorf("application ID %s does not exist", ret.ApplicationID)
        }
        return "", fmt.Errorf("error validating application")
    }
    if !exists {
        return "", fmt.Errorf("application ID %s does not exist", ret.ApplicationID)
    }

    return returnRepo.Create(ctx, ret)
}
