package routes

import (
	"car-loan-go/controllers"

	"github.com/gofiber/fiber/v2"
)

func SetupVehicleRoutes(app *fiber.App) {
	app.Get("/vehicles", controllers.GetAllVehicles)
}