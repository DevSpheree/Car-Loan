package models

type User struct {
    UID      string `json:"uid" firestore:"-"`
    Email    string `json:"email" firestore:"email"`
    // Password string `json:"password,omitempty"`
    Role    string `json:"role" firestore:"role"`
}