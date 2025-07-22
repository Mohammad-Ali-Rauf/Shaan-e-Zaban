package models

type User struct {
	ID       int                    `json:"id"`
	Username string                 `json:"username"`
	Email    string                 `json:"email"`
	Progress map[string]interface{} `json:"progress"`
}
