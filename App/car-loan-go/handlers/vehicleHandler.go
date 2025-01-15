package handlers

import (
	"car-loan-go/models"
	"car-loan-go/services"
	"car-loan-go/utils"
	"context"

	"github.com/go-playground/validator/v10"
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

func CreateVehicle(c *fiber.Ctx) error {
    ctx := context.Background()
    vehicle := new(models.Vehicle)

    // Parsear el body
    if err := c.BodyParser(vehicle); err != nil {
        return utils.SendError(c, fiber.StatusBadRequest, "Error al procesar los datos", err)
    }

    // Crear el vehículo
    id, err := services.CreateVehicle(ctx, vehicle)
    if err != nil {
        // Verificar si es un error de validación
        if _, ok := err.(*validator.ValidationErrors); ok {
            return utils.SendError(c, fiber.StatusBadRequest, "Error de validación", err)
        }
        return utils.SendError(c, fiber.StatusInternalServerError, "Error al crear el vehiculo", err)
    }

    // Asignar el ID al vehículo
    vehicle.ID = id

    return utils.SendSuccess(c, "Vehiculo creado exitosamente", vehicle)
}