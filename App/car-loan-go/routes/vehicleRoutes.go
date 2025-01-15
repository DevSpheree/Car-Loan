package routes

import (
	"car-loan-go/handlers"
	// "car-loan-go/middlewares"

	"github.com/gofiber/fiber/v2"
)

func SetupVehicleRoutes(app *fiber.App) {
    // Create a vehicle group with authentication middleware
    vehicle := app.Group("/vehicles")
    
    // All routes in this group will require authentication
    vehicle.Get("/", handlers.GetAllVehicles)
    vehicle.Post("/", handlers.CreateVehicle)
}