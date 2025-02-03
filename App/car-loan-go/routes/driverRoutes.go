package routes

import (
	"car-loan-go/handlers"

	"github.com/gofiber/fiber/v2"
)

func SetupDriverRoutes(app *fiber.App) {
	driver := app.Group("/drivers")

	driver.Get("/", handlers.GetAllDrivers)
}