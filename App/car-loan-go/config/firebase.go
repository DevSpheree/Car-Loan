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
func InitFirebase() {
	ctx := context.Background()
	sa := option.WithCredentialsFile("./config/firebase-credentials.json")
	app, err := firebase.NewApp(ctx, nil, sa)
	if err != nil {
		log.Fatalf("Error initializing Firebase: %v\n", err)
	}

	FirebaseApp = app
}

// GetFirestoreClient obtiene el cliente de Firestore
func GetFirestoreClient(ctx context.Context) *firestore.Client {
	client, err := FirebaseApp.Firestore(ctx)
	if err != nil {
		log.Fatalf("Error initializing Firestore client: %v\n", err)
	}
	return client
}