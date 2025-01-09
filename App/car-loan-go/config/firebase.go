package config

import (
	"context"
	"log"

	"cloud.google.com/go/firestore"
	firebase "firebase.google.com/go"
	"google.golang.org/api/option"
)

var FirebaseApp *firebase.App

// InitFirebase inicializa Firebase y Firestore
func InitFirebase() error {
    opt := option.WithCredentialsFile("./config/firebase-credentials.json")
    app, err := firebase.NewApp(context.Background(), nil, opt)
    if err != nil {
        return err
    }
    FirebaseApp = app
    return nil
}

// GetFirestoreClient obtiene el cliente de Firestore
func GetFirestoreClient(ctx context.Context) *firestore.Client {
	client, err := FirebaseApp.Firestore(ctx)
	if err != nil {
		log.Fatalf("Error initializing Firestore client: %v\n", err)
	}
	return client
}

