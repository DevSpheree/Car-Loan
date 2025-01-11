package main

import (
	"car-loan-go/config"
	"car-loan-go/routes"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	// Inicializar Firebase
	config.InitFirebase()

	// Inicializar Fiber
	app := fiber.New()

	// Configurar CORS
	app.Use(cors.New())

	// Ruta de bienvenida
	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendFile("index.html")
	})

	// Configurar rutas
	routes.SetupAuthRoutes(app)
	routes.SetupVehicleRoutes(app)

	// Iniciar servidor
	log.Println("Servidor iniciado en http://localhost:3000")
	log.Fatal(app.Listen(":3000"))
}
