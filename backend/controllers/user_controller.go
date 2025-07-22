package controllers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/Mohammad-Ali-Rauf/Shaan-e-Zaban/backend/models"
	"github.com/Mohammad-Ali-Rauf/Shaan-e-Zaban/backend/utils"
	"github.com/julienschmidt/httprouter"
)

func GetUsers(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	rows, err := utils.DB.Query(r.Context(), "SELECT id, username, email, progress FROM users")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var users []models.User
	for rows.Next() {
		var u models.User
		err := rows.Scan(&u.ID, &u.Username, &u.Email, &u.Progress)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		users = append(users, u)
	}

	json.NewEncoder(w).Encode(users)
}

func CreateUser(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	var u models.User
	if err := json.NewDecoder(r.Body).Decode(&u); err != nil {
		http.Error(w, "Invalid payload", http.StatusBadRequest)
		return
	}

	err := utils.DB.QueryRow(r.Context(), `
		INSERT INTO users (username, email, progress)
		VALUES ($1, $2, $3)
		RETURNING id
	`, u.Username, u.Email, u.Progress).Scan(&u.ID)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(u)
}

func GetUserByID(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	id, _ := strconv.Atoi(ps.ByName("id"))

	var u models.User
	err := utils.DB.QueryRow(r.Context(), `
		SELECT id, username, email, progress FROM users WHERE id=$1
	`, id).Scan(&u.ID, &u.Username, &u.Email, &u.Progress)

	if err != nil {
		http.Error(w, "User not found", http.StatusNotFound)
		return
	}

	json.NewEncoder(w).Encode(u)
}

func DeleteUser(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	id, err := strconv.Atoi(ps.ByName("id"))
	if err != nil {
		http.Error(w, "Invalid user ID", http.StatusBadRequest)
		return
	}

	_, err = utils.DB.Exec(r.Context(), "DELETE FROM users WHERE id = $1", id)
	if err != nil {
		http.Error(w, "Failed to delete user", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

func UpdateUser(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	id, err := strconv.Atoi(ps.ByName("id"))
	if err != nil {
		http.Error(w, "Invalid user ID", http.StatusBadRequest)
		return
	}

	var u models.User
	if err := json.NewDecoder(r.Body).Decode(&u); err != nil {
		http.Error(w, "Invalid payload", http.StatusBadRequest)
		return
	}

	_, err = utils.DB.Exec(r.Context(), `
		UPDATE users SET username = $1, email = $2, progress = $3 WHERE id = $4
	`, u.Username, u.Email, u.Progress, id)

	if err != nil {
		http.Error(w, "Failed to update user", http.StatusInternalServerError)
		return
	}

	u.ID = id
	json.NewEncoder(w).Encode(u)
}
