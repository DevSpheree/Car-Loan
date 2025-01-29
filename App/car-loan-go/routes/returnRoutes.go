package routes

import (
	"car-loan-go/handlers"

	"github.com/gofiber/fiber/v2"
)

func SetupReturnRoutes(app *fiber.App) {
	returns := app.Group("/returns")
	returns.Get("/", handlers.GetAllReturns)
	returns.Post("/", handlers.CreateReturn)
}
