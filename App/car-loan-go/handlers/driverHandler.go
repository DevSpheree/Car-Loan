package handlers

import (
	"car-loan-go/services"
	"car-loan-go/utils"
	"context"

	"github.com/gofiber/fiber/v2"
)

func GetAllDrivers(c *fiber.Ctx) error {
	ctx := context.Background()
	drivers, err := services.GetAllDrivers(ctx)
	if err != nil {
		return utils.SendError(c, fiber.StatusInternalServerError, "Error al obtener conductores", err)
	}
	return utils.SendSuccess(c, "Conductores obtenidos con exito", drivers)

}