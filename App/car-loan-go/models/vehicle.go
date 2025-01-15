package models

type Vehicle struct {
    ID           string  `json:"id" firestore:"-"`
    Type         string  `json:"type" firestore:"type" validate:"required,oneof=light heavy"`
    Brand        string  `json:"brand" firestore:"brand" validate:"required,min=2,max=50"`
    Color        string  `json:"color" firestore:"color" validate:"required,min=2,max=30"`
    Model        string  `json:"model" firestore:"model" validate:"required,min=1,max=50"`
    Weight       int     `json:"weight" firestore:"weight" validate:"required,min=1"`
    Year         int     `json:"year" firestore:"year" validate:"required,min=1900,max=2025"`
    FuelCapacity int     `json:"fuel_capacity" firestore:"fuel_capacity" validate:"required"`
    FuelType     string  `json:"fuel_type" firestore:"fuel_type" validate:"required,oneof=gasoline diesel electric hybrid"`
    KmActual     float32 `json:"km_actual" firestore:"km_actual" validate:"required,min=0"`
    KmGallon     float32 `json:"km_gallon" firestore:"km_gallon" validate:"required,min=0"`
}