package utils

import "github.com/gofiber/fiber/v2"

type Response struct {
    Success bool        `json:"success"`
    Message string      `json:"message"`
    Data    interface{} `json:"data,omitempty"`
}

// SendAPIResponse sends a standardized API response
func SendAPIResponse(c *fiber.Ctx, status int, success bool, message string, data interface{}) error {
    return c.Status(status).JSON(Response{
        Success: success,
        Message: message,
        Data:    data,
    })
}

// SendSuccess is a helper for successful responses
func SendSuccess(c *fiber.Ctx, message string, data interface{}) error {
    return SendAPIResponse(c, fiber.StatusOK, true, message, data)
}

// SendError is a helper for error responses
func SendError(c *fiber.Ctx, status int, message string, err error) error {
    errMessage := message
    if err != nil {
        errMessage = err.Error()
    }
    return SendAPIResponse(c, status, false, errMessage, nil)
}