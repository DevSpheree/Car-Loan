package routes

import (
	"car-loan-go/handlers"

	"github.com/gofiber/fiber/v2"
)

func SetupVehicleRoutes(app *fiber.App) {
    vehicle := app.Group("/vehicles")
    
    vehicle.Get("/", handlers.GetAllVehicles)
    vehicle.Post("/", handlers.CreateVehicle)
    vehicle.Post("/:id/image", handlers.UploadVehicleImage)
}