package handlers

import (
	"car-loan-go/config"
	"car-loan-go/models"
	"car-loan-go/utils"
	"context"

	"firebase.google.com/go/auth"
	"github.com/gofiber/fiber/v2"
)

func Login(c *fiber.Ctx) error {
    ctx := context.Background()
    var user models.User

    if err := c.BodyParser(&user); err != nil {
        return utils.SendError(c, fiber.StatusBadRequest, "Error al procesar los datos", err)
    }

    authClient, err := config.FirebaseApp.Auth(ctx)
    if err != nil {
        return utils.SendError(c, fiber.StatusInternalServerError, "Error con el servicio de autenticación", err)
    }

    // Create user if not exists using UserToCreate
    params := (&auth.UserToCreate{}).
        Email(user.Email).
        Password(user.Password)

    userRecord, err := authClient.CreateUser(ctx, params)
    if err != nil {
        // If user exists, try to get the user
        userRecord, err = authClient.GetUserByEmail(ctx, user.Email)
        if err != nil {
            return utils.SendError(c, fiber.StatusUnauthorized, "Usuario no encontrado", err)
        }
    }

    // Set custom claims
    claims := map[string]interface{}{
        "role": "user",
    }

    err = authClient.SetCustomUserClaims(ctx, userRecord.UID, claims)
    if err != nil {
        return utils.SendError(c, fiber.StatusInternalServerError, "Error setting claims", err)
    }

    // Create custom token
    token, err := authClient.CustomToken(ctx, userRecord.UID)
    if err != nil {
        return utils.SendError(c, fiber.StatusInternalServerError, "Error generating token", err)
    }

    responseData := fiber.Map{
        "token": token,
        "user": fiber.Map{
            "uid":   userRecord.UID,
            "email": userRecord.Email,
        },
    }

    return utils.SendSuccess(c, "Login exitoso", responseData)
}
