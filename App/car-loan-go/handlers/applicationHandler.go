package handlers

import (
	"car-loan-go/models"
	"car-loan-go/services"
	"car-loan-go/utils"
	"context"

	"github.com/gofiber/fiber/v2"
)

func GetMyApplications(c *fiber.Ctx) error {
    ctx := context.Background()
    userID := c.Query("user_id")

    if userID == "" {
        return utils.SendError(c, fiber.StatusBadRequest, "User ID is required", nil)
    }

    applications, err := services.GetMyApplications(ctx, userID)
    if err != nil {
        return utils.SendError(c, fiber.StatusInternalServerError, "Error al obtener solicitudes", err)
    }

	if len(applications) == 0 {
        return utils.SendSuccess(c, "El cliente especificado no tiene solicitudes registradas", applications)
    }

    return utils.SendSuccess(c, "Solicitudes obtenidas con éxito", applications)
}

func CreateApplication(c *fiber.Ctx) error {
	ctx := context.Background()
	application := new(models.Application)

	if err := c.BodyParser(application); err != nil {
		return utils.SendError(c, fiber.StatusBadRequest, "Error al procesar los datos", err)
	}

	id, err := services.CreateApplication(ctx, application)
	if err != nil {
		return utils.SendError(c, fiber.StatusInternalServerError, "Error al crear la solicitud", err)
	}

	application.ID = id

	return utils.SendSuccess(c, "Solicitud creada exitosamente", application)
}