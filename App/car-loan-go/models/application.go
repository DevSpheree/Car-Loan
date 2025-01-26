package models

import "time"

type Application struct {
	ID           string    `json:"id" firestore:"-"`
	VehicleID    string    `json:"vehicle_id" firestore:"vehicle_id" validate:"required"`
	VehicleName  string    `json:"vehicle_name" firestore:"-"`
	AdminID      string    `json:"admin_id" firestore:"admin_id"`
	ClientID     string    `json:"client_id" firestore:"client_id" validate:"required"`
	Client *User `json:"client" firestore:"-"`
	Date         time.Time `json:"date" firestore:"date" validate:"required"`
	Reason 	 string    `json:"reason" firestore:"reason" validate:"required,min=2,max=150"`
	RejectionReason string `json:"rejection_reason" firestore:"rejection_reason" validate:"max=150"`
	Destination  string    `json:"destination" firestore:"destination" validate:"required,min=2,max=100"`
	ReturnDate   time.Time `json:"return_date" firestore:"return_date" validate:"required"`
	ReturnStatus string    `json:"return_status" firestore:"return_status" validate:"required,oneof=FINALIZADA NO_FINALIZADA"`
	Status       string    `json:"status" firestore:"status" validate:"required,oneof=PENDIENTE APROBADA RECHAZADA CANCELADA"`
	UsageTime    int       `json:"usage_time" firestore:"usage_time" validate:"required"`
	CancelReason string    `json:"cancel_reason" firestore:"cancel_reason" validate:"max=150"`
}