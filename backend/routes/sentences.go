package routes

import (
	"http"
)

http.HandleFunc("/api/sentence", func(w http.ResponseWriter, r *http.Request) {
	level := r.URL.Query().Get("level")
	if level == "" {
		level = "Beginner/A1" // default fallback
	}

	sentence, err := utils.GetRandomSentence(level)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(sentence)
})