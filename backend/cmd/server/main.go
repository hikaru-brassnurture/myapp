package main

import (
	"log"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"

	"myapp/internal/database"
	"myapp/internal/handler"
	"myapp/internal/middleware"
)

func main() {
	_ = godotenv.Load()

	db, err := database.Connect()
	if err != nil {
		log.Fatalf("DB接続失敗: %v", err)
	}
	database.Migrate(db)

	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		AllowCredentials: true,
	}))

	authHandler := handler.NewAuthHandler(db)
	userHandler := handler.NewUserHandler(db)

	api := r.Group("/api")
	{
		auth := api.Group("/auth")
		{
			auth.POST("/register", authHandler.Register)
			auth.POST("/login", authHandler.Login)
		}

		protected := api.Group("/")
		protected.Use(middleware.JWTAuth())
		{
			protected.GET("/me", userHandler.Me)
			protected.PUT("/me", userHandler.UpdateMe)
		}
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	log.Printf("起動中: http://localhost:%s", port)
	r.Run(":" + port)
}
