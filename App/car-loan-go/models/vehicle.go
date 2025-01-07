package models

type Vehicle struct {
	ID           string  `firestore:"-"` // ID generado automáticamente
	Type         string  `firestore:"type"`
	Brand        string  `firestore:"brand"`
	Color        string  `firestore:"color"`
	Model        string  `firestore:"model"`
	Weight       int     `firestore:"weight"`
	Year         int     `firestore:"year"`
	FuelCapacity int     `firestore:"fuel_capacity"`
	FuelType     string  `firestore:"fuel_type"`
	KmActual     float32 `firestore:"km_actual"`
	KmGallon     float32 `firestore:"km_gallon"`
}
