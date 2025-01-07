package utils

import "github.com/gofiber/fiber/v2"

// GenericResponse define el formato de respuesta estándar.
type GenericResponse struct {
    Status   int         `json:"status"`
    Message  string      `json:"message"`
    Response interface{} `json:"response,omitempty"`
}

// SendResponse envía una respuesta estándar.
func SendResponse(c *fiber.Ctx, status int, message string, data interface{}) error {
    return c.Status(status).JSON(GenericResponse{
        Status:   status,
        Message:  message,
        Response: data,
    })
}

// SendError envía una respuesta de error estándar.
func SendError(c *fiber.Ctx, status int, message string, err error) error {
    return c.Status(status).JSON(GenericResponse{
        Status:   status,
        Message:  message,
        Response: fiber.Map{"error": err.Error()},
    })
}
