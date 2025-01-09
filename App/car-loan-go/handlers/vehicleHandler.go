package handlers

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
        return utils.SendError(c, fiber.StatusInternalServerError, "Error al obtener vehículos", err)
    }
    return utils.SendSuccess(c, "Vehículos obtenidos con éxito", vehicles)
}