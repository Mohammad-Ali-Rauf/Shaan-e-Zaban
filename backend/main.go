package main

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/Mohammad-Ali-Rauf/Shaan-e-Zaban/backend/utils"
)

func main() {
	utils.InitDB()
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		// Set response header
		w.Header().Set("Content-Type", "application/json")

		// JSON response
		resp := map[string]string{"message": "🔥 Shaan-e-Zaban backend is live!"}
		if err := json.NewEncoder(w).Encode(resp); err != nil {
			http.Error(w, "Something went wrong", http.StatusInternalServerError)
			return
		}
	})

	log.Println("🔥 Shaan-e-Zaban backend is live at http://localhost:8080")
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Fatalf("Server failed: %v", err)
	}
}
