package models

type Vehicle struct {
	ID               string  `json:"id" firestore:"-"`
	ActivityLocation string  `json:"activity_location" firestore:"activity_location" validate:"required,min=2,max=50"`
	BrandYear        string  `json:"brand_year" firestore:"brand_year" validate:"required,min=2,max=100"`
	Chasis           string  `json:"chasis" firestore:"chasis" validate:"required,min=2,max=100"`
	Engine           string  `json:"engine" firestore:"engine" validate:"required,min=2,max=100"`
	Fuel             string  `json:"fuel" firestore:"fuel" validate:"required,oneof=GASOLINA ELECTRICO DIESEL HIBRIDO NO_APLICA"`
	Num              int     `json:"num" firestore:"num" validate:"required"`
	Property         string  `json:"property" firestore:"property" validate:"required,min=2,max=50"`
	Responsible      string  `json:"responsible" firestore:"responsible" validate:"required,min=2,max=50"`
	Type             string  `json:"type" firestore:"type" validate:"required,min=2,max=25"`
	VehiclePlate     string  `json:"vehicle_plate" firestore:"vehicle_plate" validate:"required,min=2,max=10"`
	Brand            string  `json:"brand" firestore:"brand" validate:"required,min=2,max=50"`
	Color            string  `json:"color" firestore:"color" validate:"required,min=1,max=30"`
	Year             int     `json:"year" firestore:"year" validate:"required,min=1900,max=2025"`
	FuelCapacity     int     `json:"fuel_capacity" firestore:"fuel_capacity" validate:"min=0"`
    KmActual         float32 `json:"km_actual" firestore:"km_actual" validate:"min=0"`
    KmGallon         float32 `json:"km_gallon" firestore:"km_gallon" validate:"min=0"`
}


