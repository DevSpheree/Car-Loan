package config

import (
	"context"
	"log"
	"os"

	"cloud.google.com/go/firestore"
	firebase "firebase.google.com/go"
	"google.golang.org/api/option"
)

var FirebaseApp *firebase.App

func InitFirebase() error {
    credPath := "./config/firebase-credentials.json"
    
    if _, err := os.Stat(credPath); os.IsNotExist(err) {
        log.Printf("Warning: Credentials file not found at %s\n", credPath)
        return err
    }

    opt := option.WithCredentialsFile(credPath)
    app, err := firebase.NewApp(context.Background(), nil, opt)
    if err != nil {
        log.Printf("Error initializing Firebase app: %v\n", err)
        return err
    }
    
    FirebaseApp = app
    
    ctx := context.Background()
    client, err := app.Firestore(ctx)
    if err != nil {
        log.Printf("Error connecting to Firestore: %v\n", err)
        return err
    }
    defer client.Close()
    
    return nil
}

func GetFirestoreClient(ctx context.Context) *firestore.Client {
	client, err := FirebaseApp.Firestore(ctx)
	if err != nil {
		log.Fatalf("Error initializing Firestore client: %v\n", err)
	}
	return client
}

