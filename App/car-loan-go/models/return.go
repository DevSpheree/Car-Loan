package models

type Return struct {
	ID           string `json:"id" firestore:"-"`
	ApplicationID string `json:"application_id" firestore:"application_id" validate:"required"`
	Observations string `json:"observations" firestore:"observations" validate:"max=150"`
}