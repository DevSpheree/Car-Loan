package models

type Driver struct {
	ID          string `json:"id" firestore:"-" form:"-"`
	Name string `json:"name" firestore:"name" form:"name" validate:"required,min=2,max=100"`
	LastName string `json:"last_name" firestore:"last_name" form:"last_name" validate:"required,min=2,max=100"`
}