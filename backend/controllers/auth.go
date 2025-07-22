package controllers

import (
	"encoding/json"
	"net/http"

	"github.com/julienschmidt/httprouter"

	"github.com/Mohammad-Ali-Rauf/Shaan-e-Zaban/backend/models"
	"github.com/Mohammad-Ali-Rauf/Shaan-e-Zaban/backend/utils"
)

func Login(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	var creds models.User
	if err := json.NewDecoder(r.Body).Decode(&creds); err != nil {
		http.Error(w, "Invalid payload", http.StatusBadRequest)
		return
	}

	var dbUser models.User
	err := utils.DB.QueryRow(r.Context(), `
		SELECT id, username, email FROM users WHERE email=$1 AND username=$2
	`, creds.Email, creds.Username).Scan(&dbUser.ID, &dbUser.Username, &dbUser.Email)
	if err != nil {
		http.Error(w, "Invalid credentials", http.StatusUnauthorized)
		return
	}

	token, err := utils.GenerateJWT(dbUser.ID)
	if err != nil {
		http.Error(w, "Token error", http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(map[string]string{
		"token": token,
	})
}
