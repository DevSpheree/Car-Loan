package main

import (
    "context"
    "log"

    firebase "firebase.google.com/go"
    "github.com/gofiber/fiber/v2"
    "google.golang.org/api/option"
)

func main() {
    // Inicializar Firebase
    ctx := context.Background()
    sa := option.WithCredentialsFile("./config/firebase-credentials.json") // Reemplaza con la ruta de tu archivo
    app, err := firebase.NewApp(ctx, nil, sa)
    if err != nil {
        log.Fatalf("Error initializing app: %v\n", err)
    }

    // Inicializar Firestore
    client, err := app.Firestore(ctx)
    if err != nil {
        log.Fatalf("Error initializing Firestore: %v\n", err)
    }
    defer client.Close()

    // Inicializar Fiber
    fiberApp := fiber.New()

    // Ruta de ejemplo para obtener datos
    fiberApp.Get("/data", func(c *fiber.Ctx) error {
        // Ejemplo de consulta a Firestore
        docs, err := client.Collection("task").Documents(ctx).GetAll()
        if err != nil {
            return c.Status(500).JSON(fiber.Map{
                "error": err.Error(),
            })
        }

        var data []map[string]interface{}
        for _, doc := range docs {
            data = append(data, doc.Data())
        }

        return c.JSON(data)
    })

    // Ruta de bienvenida
    fiberApp.Get("/", func(c *fiber.Ctx) error {
        return c.SendString("¡Bienvenido a la primera api de Car Loan con Go!")
    })

    // Inicia el servidor
    fiberApp.Listen(":3000")
}