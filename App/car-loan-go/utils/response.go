package utils

import "github.com/gofiber/fiber/v2"

type Response struct {
    Success bool        `json:"success"`
    Message string      `json:"message"`
    Data    interface{} `json:"data,omitempty"`
}

func SendAPIResponse(c *fiber.Ctx, status int, success bool, message string, data interface{}) error {
    return c.Status(status).JSON(Response{
        Success: success,
        Message: message,
        Data:    data,
    })
}

func SendSuccess(c *fiber.Ctx, message string, data interface{}) error {
    return SendAPIResponse(c, fiber.StatusOK, true, message, data)
}


func SendError(c *fiber.Ctx, status int, message string, err error) error {
    errMessage := message
    if err != nil {
        errMessage = err.Error()
    }
    return SendAPIResponse(c, status, false, errMessage, nil)
}