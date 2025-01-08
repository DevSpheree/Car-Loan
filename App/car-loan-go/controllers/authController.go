package controllers

import (
    "car-loan-go/config"
    "car-loan-go/models"
    "car-loan-go/utils"
    "context"

    "github.com/gofiber/fiber/v2"
)

func Login(c *fiber.Ctx) error {
    ctx := context.Background()
    var user models.User

    if err := c.BodyParser(&user); err != nil {
        return utils.SendError(c, fiber.StatusBadRequest, "Error al procesar los datos", err)
    }

    // Obtener el cliente de autenticación de Firebase
    authClient, err := config.FirebaseApp.Auth(ctx)
    if err != nil {
        return utils.SendError(c, fiber.StatusInternalServerError, "Error con el servicio de autenticación", err)
    }

    // Verificar el usuario por email
    userRecord, err := authClient.GetUserByEmail(ctx, user.Email)
    if err != nil {
        return utils.SendError(c, fiber.StatusUnauthorized, "Usuario no encontrado", err)
    }

    // Generar token personalizado
    token, err := authClient.CustomToken(ctx, userRecord.UID)
    if err != nil {
        return utils.SendError(c, fiber.StatusInternalServerError, "Error al generar el token", err)
    }

    // Crear respuesta personalizada
    response := fiber.Map{
        "token": token,
        "user": fiber.Map{
            "uid":   userRecord.UID,
            "email": userRecord.Email,
        },
    }

    return utils.SendResponse(c, fiber.StatusOK, "Login exitoso", response)
}
