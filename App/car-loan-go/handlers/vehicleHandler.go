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
        return utils.SendError(c, fiber.StatusInternalServerError, "Error al obtener vehiculos", err)
    }
    return utils.SendSuccess(c, "Vehiculos obtenidos con exito", vehicles)
}

func CreateVehicle(c *fiber.Ctx) error {
    ctx := context.Background()
    vehicle := new(models.Vehicle)

    if err := c.BodyParser(vehicle); err != nil {
        return utils.SendError(c, fiber.StatusBadRequest, "Error al procesar los datos", err)
    }

    id, err := services.CreateVehicle(ctx, vehicle)
    if err != nil {
        if _, ok := err.(*validator.ValidationErrors); ok {
            return utils.SendError(c, fiber.StatusBadRequest, "Error de validación", err)
        }
        return utils.SendError(c, fiber.StatusInternalServerError, "Error al crear el vehiculo", err)
    }

    vehicle.ID = id

    return utils.SendSuccess(c, "Vehiculo creado exitosamente", vehicle)
}

func UploadVehicleImage(c *fiber.Ctx) error {
    ctx := context.Background()
    vehicleID := c.Params("id")

    if vehicleID == "" {
        return utils.SendError(c, fiber.StatusBadRequest, "El ID del vehiculo es requerido", nil)
    }

    // Obtener archivo
    file, err := c.FormFile("image")
    if err != nil {
        return utils.SendError(c, fiber.StatusBadRequest, "Error obteniendo la imagen", err)
    }

    // Validar tipo de archivo
    if !isValidImageType(file.Header.Get("Content-Type")) {
        return utils.SendError(c, fiber.StatusBadRequest, "Tipo de archivo invalido. Solo se permiten imagenes!", nil)
    }

    // Validar tamaño del archivo (ejemplo: max 5MB)
    if file.Size > 5*1024*1024 {
        return utils.SendError(c, fiber.StatusBadRequest, "El archivo es demasaido grande. Tamaño máximo 5MB", nil)
    }

    if err := services.UpdateVehicleImage(ctx, vehicleID, file); err != nil {
        return utils.SendError(c, fiber.StatusInternalServerError, "Error subiendo la imagen", err)
    }

    return utils.SendSuccess(c, "Imagen subida exitosamente!", nil)
}

func isValidImageType(contentType string) bool {
    validTypes := map[string]bool{
        "image/jpeg": true,
        "image/png":  true,
        "image/gif":  true,
        "image/webp": true,
    }
    return validTypes[contentType]
}