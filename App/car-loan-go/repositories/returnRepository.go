package repositories

import (
	"car-loan-go/config"
	"car-loan-go/models"
	"context"

	"cloud.google.com/go/firestore"
	"google.golang.org/api/iterator"
)

type ReturnRepository struct{}

func (r *ReturnRepository) GetAll(ctx context.Context) ([]models.Return, error) {
	client := config.GetFirestoreClient(ctx)
	defer client.Close()

	var returns []models.Return
	iter := client.Collection("returns").Documents(ctx)

	for {
		doc, err := iter.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return nil, err
		}

		var ret models.Return
		if err := doc.DataTo(&ret); err != nil {
			return nil, err
		}
		ret.ID = doc.Ref.ID
		returns = append(returns, ret)
	}

	return returns, nil
}

func (r *ReturnRepository) Create(ctx context.Context, ret *models.Return) (string, error) {
	client := config.GetFirestoreClient(ctx)
	defer client.Close()

	var docRef *firestore.DocumentRef
	if ret.ID != "" {
		docRef = client.Collection("returns").Doc(ret.ID)
		_, err := docRef.Set(ctx, ret)
		if err != nil {
			return "", err
		}
		return ret.ID, nil
	}

	doc, _, err := client.Collection("returns").Add(ctx, ret)
	if err != nil {
		return "", err
	}
	return doc.ID, nil
}