package services

import (
	"car-loan-go/config"
	"context"
	"fmt"
	"io"
	"mime/multipart"
	"net/url"
	"path/filepath"
	"strings"

	"cloud.google.com/go/storage"
	"github.com/google/uuid"
)

func UploadVehicleImage(ctx context.Context, file *multipart.FileHeader, vehicleID string) (string, error) {

    storageClient, err := config.FirebaseApp.Storage(ctx)
    if err != nil {
        return "", fmt.Errorf("error obteniendo el storage client: %v", err)
    }

    bucketName := "car-loan-backend.firebasestorage.app"
    bucket, err := storageClient.Bucket(bucketName)
    if err != nil {
        return "", fmt.Errorf("error obteniendo el bucket: %v", err)
    }

    ext := filepath.Ext(file.Filename)
    fileName := fmt.Sprintf("vehicles/%s/%s%s", vehicleID, uuid.New().String(), ext)

    obj := bucket.Object(fileName)

    src, err := file.Open()
    if err != nil {
        return "", fmt.Errorf("error opening file: %v", err)
    }
    defer src.Close()

    writer := obj.NewWriter(ctx)
    writer.ContentType = file.Header.Get("Content-Type")
    writer.CacheControl = "public, max-age=31536000"

    if _, err := io.Copy(writer, src); err != nil {
        return "", fmt.Errorf("error copiando el archivo en el storage: %v", err)
    }

    if err := writer.Close(); err != nil {
        return "", fmt.Errorf("error cerrando el writer: %v", err)
    }

    if err := obj.ACL().Set(ctx, storage.AllUsers, storage.RoleReader); err != nil {
        return "", fmt.Errorf("error haciendo el archivo publico: %v", err)
    }

    attrs, err := obj.Attrs(ctx)
    if err != nil {
        return "", fmt.Errorf("error obteniendo los atributos del archivo: %v", err)
    }

    return attrs.MediaLink, nil
}

func deleteImageFromStorage(ctx context.Context, imageURL string) error {
    if imageURL == "" {
        return nil
    }

    storageClient, err := config.FirebaseApp.Storage(ctx)
    if err != nil {
        return fmt.Errorf("error getting storage client: %v", err)
    }

    bucketName := "car-loan-backend.firebasestorage.app"
    bucket, err := storageClient.Bucket(bucketName)
    if err != nil {
        return fmt.Errorf("error obteniendo el bucket: %v", err)
    }

    u, err := url.Parse(imageURL)
    if err != nil {
        return fmt.Errorf("error parsing URL: %v", err)
    }

    // Extract path between /o/ and ? or end of string
    path := u.Path
    if idx := strings.Index(path, "/o/"); idx != -1 {
        path = path[idx+3:]
    }

    // Remove query parameters if present
    if idx := strings.Index(path, "?"); idx != -1 {
        path = path[:idx]
    }

    // URL decode the object name
    objectName, err := url.QueryUnescape(path)
    if err != nil {
        return fmt.Errorf("error decoding object name: %v", err)
    }

    // log.Printf("Attempting to delete object: %s from URL: %s", objectName, imageURL)

    obj := bucket.Object(objectName)
    if err := obj.Delete(ctx); err != nil {
        if err == storage.ErrObjectNotExist {
            // log.Printf("Object not found: %s", objectName)
            return nil
        }
        return fmt.Errorf("error eliminando la imagen previa: %v", err)
    }

    // log.Printf("Successfully deleted object: %s", objectName)
    return nil
}

func UploadPermissionFile(ctx context.Context, file *multipart.FileHeader, applicationID string) (string, error) {
    storageClient, err := config.FirebaseApp.Storage(ctx)
    if err != nil {
        return "", fmt.Errorf("error getting storage client: %v", err)
    }

    bucketName := "car-loan-backend.firebasestorage.app"
    bucket, err := storageClient.Bucket(bucketName)
    if err != nil {
        return "", fmt.Errorf("error getting bucket: %v", err)
    }

    ext := filepath.Ext(file.Filename)
    fileName := fmt.Sprintf("permissions/%s/%s%s", applicationID, uuid.New().String(), ext)

    obj := bucket.Object(fileName)

    src, err := file.Open()
    if err != nil {
        return "", fmt.Errorf("error opening file: %v", err)
    }
    defer src.Close()

    writer := obj.NewWriter(ctx)
    writer.ContentType = file.Header.Get("Content-Type")
    writer.CacheControl = "public, max-age=31536000"

    if _, err := io.Copy(writer, src); err != nil {
        return "", fmt.Errorf("error copying file to storage: %v", err)
    }

    if err := writer.Close(); err != nil {
        return "", fmt.Errorf("error closing writer: %v", err)
    }

    if err := obj.ACL().Set(ctx, storage.AllUsers, storage.RoleReader); err != nil {
        return "", fmt.Errorf("error making file public: %v", err)
    }

    attrs, err := obj.Attrs(ctx)
    if err != nil {
        return "", fmt.Errorf("error getting file attributes: %v", err)
    }

    return attrs.MediaLink, nil
}