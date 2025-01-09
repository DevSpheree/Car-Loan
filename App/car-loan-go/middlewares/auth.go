package middlewares

import (
    "car-loan-go/config"
    "car-loan-go/utils"
    "strings"

    "github.com/gofiber/fiber/v2"
)

func AuthMiddleware() fiber.Handler {
    return func(c *fiber.Ctx) error {
		
        // Get authorization header
        authHeader := c.Get("Authorization")
        if authHeader == "" {
            return utils.SendError(c, fiber.StatusUnauthorized, "No authorization header", nil)
        }

        // Check if the header starts with "Bearer "
        bearerToken := strings.Split(authHeader, "Bearer ")
        if len(bearerToken) != 2 {
            return utils.SendError(c, fiber.StatusUnauthorized, "Invalid token format", nil)
        }

        token := bearerToken[1]

        // Verify the Firebase token
        authClient, err := config.FirebaseApp.Auth(c.Context())
        if err != nil {
            return utils.SendError(c, fiber.StatusInternalServerError, "Error initializing auth", err)
        }

        // Verify the token
        tokenData, err := authClient.VerifyIDToken(c.Context(), token)
        if err != nil {
            return utils.SendError(c, fiber.StatusUnauthorized, "Invalid token", err)
        }

        // Add the user ID to the context for later use
        c.Locals("userId", tokenData.UID)

        return c.Next()
    }
}