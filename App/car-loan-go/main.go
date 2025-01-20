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
	
    // Obtener el puerto desde las variables de entorno
    port := os.Getenv("PORT")
    if port == "" {
        port = "3000" // Puerto por defecto si no se especifica en el archivo .env
    }
	
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
	routes.SetupApplicationRoutes(app)

	// Iniciar servidor
	log.Println("Servidor iniciado en http://localhost:" + port)
	log.Fatal(app.Listen(":" + port))
}
