package handlers

import (
	"car-loan-go/models"
	"car-loan-go/services"
	"car-loan-go/utils"
	"context"

	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
)

func GetAllReturns(c *fiber.Ctx) error {
	ctx := context.Background()

	returns, err := services.GetAllReturns(ctx)
	if err != nil {
		return utils.SendError(c, fiber.StatusInternalServerError, "Error al obtener las devoluciones", err)
	}

	if len(returns) == 0 {
		return utils.SendSuccess(c, "No hay devoluciones registradas", returns)
	}

	return utils.SendSuccess(c, "Devoluciones obtenidas con exito", returns)
}

func CreateReturn(c *fiber.Ctx) error {
	ctx := context.Background()
	ret := new(models.Return)

	if err := c.BodyParser(ret); err != nil {
		return utils.SendError(c, fiber.StatusBadRequest, "Error al procesar los datos", err)
	}

	id, err := services.CreateReturn(ctx, ret)
	if err != nil {
		if _, ok := err.(*validator.ValidationErrors); ok {
            return utils.SendError(c, fiber.StatusBadRequest, "Error de validación", err)
        }
		return utils.SendError(c, fiber.StatusInternalServerError, "Error al crear la devolución", err)
	}

	ret.ID = id

	return utils.SendSuccess(c, "Devolucion creada exitosamente", ret)
}
