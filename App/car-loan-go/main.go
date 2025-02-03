package main

import (
	"car-loan-go/config"
	"car-loan-go/routes"
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	
    port := os.Getenv("PORT")
    if port == "" {
        port = "3000" 
    }
	
	config.InitFirebase()

	app := fiber.New()

	app.Use(cors.New())

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendFile("index.html")
	})

	routes.SetupAuthRoutes(app)
	routes.SetupVehicleRoutes(app)
	routes.SetupApplicationRoutes(app)
	routes.SetupReturnRoutes(app)
	routes.SetupDriverRoutes(app)

	log.Println("Servidor iniciado en http://localhost:" + port)
	log.Fatal(app.Listen(":" + port))
}
