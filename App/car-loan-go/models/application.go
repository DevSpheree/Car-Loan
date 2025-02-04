package models

import "time"

type Application struct {
    ID               string    `json:"id" firestore:"-" form:"-"`
    VehicleID        string    `json:"vehicle_id" firestore:"vehicle_id" form:"vehicle_id" validate:"required"`
    AdminID          string    `json:"admin_id" firestore:"admin_id" form:"admin_id"`
    ClientID         string    `json:"client_id" firestore:"client_id" form:"client_id" validate:"required"`
    DriverID         string    `json:"driver_id" firestore:"driver_id" form:"driver_id" validate:"max=150"`
    VehicleName      string    `json:"vehicle_name" firestore:"-" form:"-"`
    Client           *User     `json:"client" firestore:"-" form:"-"`
    Date             time.Time `json:"date" firestore:"date" form:"date" validate:"required"`
    Reason           string    `json:"reason" firestore:"reason" form:"reason" validate:"required,min=2,max=150"`
    RejectionReason  string    `json:"rejection_reason" firestore:"rejection_reason" form:"rejection_reason" validate:"max=150"`
    Destination      string    `json:"destination" firestore:"destination" form:"destination" validate:"required,min=2,max=100"`
    ReturnDate       time.Time `json:"return_date" firestore:"return_date" form:"return_date" validate:"required"`
    ReturnStatus     string    `json:"return_status" firestore:"return_status" form:"return_status" validate:"required,oneof=FINALIZADA NO_FINALIZADA"`
    Status           string    `json:"status" firestore:"status" form:"status" validate:"required,oneof=PENDIENTE APROBADA RECHAZADA CANCELADA"`
    UsageTime        int       `json:"usage_time" firestore:"usage_time" form:"usage_time" validate:"required"`
    CancelReason     string    `json:"cancel_reason" firestore:"cancel_reason" form:"cancel_reason" validate:"max=150"`
    PermissionFileURL string    `json:"permission_file_url" firestore:"permission_file_url" form:"permission_file_url"`
}