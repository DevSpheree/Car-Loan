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

	// Parsear los datos del formulario
	if err := c.BodyParser(application); err != nil {
		return utils.SendError(c, fiber.StatusBadRequest, "Error al procesar los datos", err)
	}

	// Obtener el archivo de permiso
	file, err := c.FormFile("permission_file")
	if err != nil {
		return utils.SendError(c, fiber.StatusBadRequest, "El archivo de permiso es requerido", err)
	}

	// Validar el tipo de archivo
	contentType := file.Header.Get("Content-Type")
	if !isValidPermissionFileType(contentType) {
		return utils.SendError(c,
			fiber.StatusBadRequest,
			"Tipo de archivo inválido. Solo se permiten archivos PDF o Word",
			nil)
	}

	// Validar el tamaño del archivo (1MB = 1 * 1024 * 1024 bytes)
	if file.Size > 1*1024*1024 {
		return utils.SendError(c,
			fiber.StatusBadRequest,
			"El archivo es demasiado grande. Tamaño máximo 1MB",
			nil)
	}

	// Crear la aplicación primero
	id, err := services.CreateApplication(ctx, application)
	if err != nil {
		return utils.SendError(c, fiber.StatusInternalServerError, "Error al crear la solicitud", err)
	}

	// Subir el archivo de permiso
	fileURL, err := services.UploadPermissionFile(ctx, file, id)
	if err != nil {
		// Si falla la subida del archivo, eliminar la aplicación creada
		services.DeleteApplication(ctx, id)
		return utils.SendError(c,
			fiber.StatusInternalServerError,
			"Error al subir el archivo de permiso",
			err)
	}

	// Actualizar la URL del archivo en la aplicación
	if err := services.UpdateApplicationPermissionURL(ctx, id, fileURL); err != nil {
		return utils.SendError(c,
			fiber.StatusInternalServerError,
			"Error al actualizar la URL del permiso",
			err)
	}

	application.ID = id
	application.PermissionFileURL = fileURL

	return utils.SendSuccess(c, "Solicitud creada exitosamente", application)
}

func UpdateApplicationStatus(c *fiber.Ctx) error {
	ctx := context.Background()
	userId := c.Query("user_id")
	applicationId := c.Query("application_id")

	if userId == "" {
		return utils.SendError(c, fiber.StatusBadRequest, "ID de usuario requerido", nil)
	}

	if applicationId == "" {
		return utils.SendError(c, fiber.StatusBadRequest, "ID de solicitud requerido", nil)
	}

	update := new(models.Application)
	if err := c.BodyParser(update); err != nil {
		return utils.SendError(c, fiber.StatusBadRequest, "Error al procesar los datos", err)
	}

	if update.Status == "" {
		return utils.SendError(c, fiber.StatusBadRequest, "El estado es requerido", nil)
	}

	if err := services.UpdateApplicationStatus(ctx,
		userId,
		applicationId,
		update.Status,
		update.RejectionReason,
		update.CancelReason); err != nil {
		return utils.SendError(c, fiber.StatusInternalServerError, "Error al actualizar el estado", err)
	}

	response := fiber.Map{
		"application_id": applicationId,
		"status":         update.Status,
	}

	switch update.Status {
	case "RECHAZADA":
		response["rejection_reason"] = update.RejectionReason
	case "CANCELADA":
		response["cancel_reason"] = update.CancelReason
	}

	return utils.SendSuccess(c, "Estado actualizado exitosamente", response)
}

func isValidPermissionFileType(contentType string) bool {
	validTypes := map[string]bool{
		"application/pdf":    true,
		"application/msword": true,
		"application/vnd.openxmlformats-officedocument.wordprocessingml.document": true,
	}
	return validTypes[contentType]
}

func UpdateApplication(c *fiber.Ctx) error {
	ctx := context.Background()
	applicationID := c.Params("id")
	userID := c.Query("user_id")

	if userID == "" {
		return utils.SendError(c, fiber.StatusBadRequest, "ID de usuario requerido", nil)
	}

	// Parsear la aplicación del form
	update := new(models.Application)
	if err := c.BodyParser(update); err != nil {
		return utils.SendError(c, fiber.StatusBadRequest, "Error al procesar los datos", err)
	}

	// Obtener archivo si existe
	file, _ := c.FormFile("permission_file")
	if file != nil {
		contentType := file.Header.Get("Content-Type")
		if !isValidPermissionFileType(contentType) {
			return utils.SendError(c,
				fiber.StatusBadRequest,
				"Tipo de archivo inválido. Solo se permiten archivos PDF o Word",
				nil)
		}

		// Validar el tamaño del archivo (1MB = 1 * 1024 * 1024 bytes)
		if file.Size > 1*1024*1024 {
			return utils.SendError(c,
				fiber.StatusBadRequest,
				"El archivo es demasiado grande. Tamaño máximo 1MB",
				nil)
		}
	}

	updatedApp, err := services.UpdateApplication(ctx, applicationID, userID, update, file)
	if err != nil {
		return utils.SendError(c, fiber.StatusInternalServerError, "Error al actualizar la solicitud", err)
	}

	return utils.SendSuccess(c, "Solicitud actualizada exitosamente", updatedApp)
}
