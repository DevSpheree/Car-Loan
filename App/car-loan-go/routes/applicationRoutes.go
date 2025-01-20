package routes

import (
	"car-loan-go/handlers"

	"github.com/gofiber/fiber/v2"
)

func SetupApplicationRoutes(app *fiber.App) {
	application := app.Group("/applications")
	application.Get("/", handlers.GetMyApplications)
	application.Post("/", handlers.CreateApplication)
}