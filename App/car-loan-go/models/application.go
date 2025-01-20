package models

import "time"

type Application struct {
	ID           string    `json:"id" firestore:"-"`
	VehicleID    string    `json:"vehicle_id" firestore:"vehicle_id" validate:"required"`
	AdminID      string    `json:"admin_id" firestore:"admin_id"`
	ClientID     string    `json:"client_id" firestore:"client_id" validate:"required"`
	Date         time.Time `json:"date" firestore:"date" validate:"required"`
	Destination  string    `json:"destination" firestore:"destination" validate:"required,min=2,max=100"`
	ReturnDate   time.Time `json:"return_date" firestore:"return_date" validate:"required"`
	ReturnStatus string    `json:"return_status" firestore:"return_status" validate:"required,oneof=FINALIZADA NO_FINALIZADA"`
	Status       string    `json:"status" firestore:"status" validate:"required,oneof=PENDIENTE APROBADO RECHAZADO"`
	UsageTime    int       `json:"usage_time" firestore:"usage_time" validate:"required"`
}
