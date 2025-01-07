package main

import (
	"car-loan-go/config"
	"car-loan-go/routes"

	"log"

	"github.com/gofiber/fiber/v2"
)

func main() {
	// Inicializar Firebase
	config.InitFirebase()

	// Inicializar Fiber
	app := fiber.New()

	// Configurar rutas
	routes.SetupVehicleRoutes(app)

	// Iniciar servidor
	log.Println("Servidor iniciado en http://localhost:3000")
	log.Fatal(app.Listen(":3000"))
}
