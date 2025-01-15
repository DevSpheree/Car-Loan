package models

type User struct {
    UID      string `json:"uid"`
    Email    string `json:"email"`
    Password string `json:"password,omitempty"`
}