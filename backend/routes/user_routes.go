package routes

import (
	"github.com/Mohammad-Ali-Rauf/Shaan-e-Zaban/backend/controllers"
	"github.com/julienschmidt/httprouter"
)

func RegisterUserRoutes(r *httprouter.Router) {
	r.POST("/users", controllers.CreateUser)
	r.GET("/users", controllers.GetUsers)
	r.GET("/users/:id", controllers.GetUserByID)
	r.PUT("/users/:id", controllers.UpdateUser)
	r.DELETE("/users/:id", controllers.DeleteUser)
	r.POST("/login", controllers.Login)
}
