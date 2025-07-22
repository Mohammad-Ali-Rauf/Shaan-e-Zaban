package main

import (
	"log"
	"net/http"

	"github.com/Mohammad-Ali-Rauf/Shaan-e-Zaban/backend/middleware"
	"github.com/Mohammad-Ali-Rauf/Shaan-e-Zaban/backend/routes"
	"github.com/Mohammad-Ali-Rauf/Shaan-e-Zaban/backend/utils"
	"github.com/julienschmidt/httprouter"
)

func main() {
	utils.InitDB()

	// Initialize the router
	router := httprouter.New()

	routes.RegisterUserRoutes(router)
	// routes.RegisterStyleGuideRoutes(router)
	// routes.RegisterGrammarRoutes(router)
	// routes.RegisterSentenceRoutes(router)

	// Root test endpoint
	router.GET("/", func(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte(`{"message": "🔥 Shaan-e-Zaban backend is live!"}`))
	})

	// Attach CORS middleware
	handler := middleware.CorsMiddleware(router)

	// Start the server
	log.Println("🔥 Shaan-e-Zaban backend is live at http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", handler))
}
