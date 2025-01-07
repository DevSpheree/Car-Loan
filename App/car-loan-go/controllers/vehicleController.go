package controllers

import (
	"car-loan-go/services"
	"car-loan-go/utils"
	"context"

	"github.com/gofiber/fiber/v2"
)

func GetAllVehicles(c *fiber.Ctx) error {
	ctx := context.Background()
	vehicles, err := services.GetAllVehicles(ctx)
	if err != nil {
		return utils.SendError(c, 500, "Error al obtener vehículos", err)
	}
	return utils.SendResponse(c, 200, "Vehículos obtenidos con éxito", vehicles)
}