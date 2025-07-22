package utils

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/joho/godotenv"
)

var DB *pgxpool.Pool

func InitDB() {
	_ = godotenv.Load("../.env")

	dbUser := os.Getenv("POSTGRES_USER")
	dbPass := os.Getenv("POSTGRES_PASSWORD")
	dbName := os.Getenv("POSTGRES_DB")

	fmt.Println("User:", dbUser)
	fmt.Println("Pass:", dbPass)
	fmt.Println("DB:", dbName)

	dbUrl := fmt.Sprintf("postgres://%s:%s@localhost:5432/%s?sslmode=disable", dbUser, dbPass, dbName)

	var err error
	DB, err = pgxpool.New(context.Background(), dbUrl)
	if err != nil {
		log.Fatalf("Unable to connect to DB: %v", err)
	}

	// Test connection
	err = DB.Ping(context.Background())
	if err != nil {
		log.Fatalf("Unable to ping DB: %v", err)
	}

	_, err = DB.Exec(context.Background(), `
		CREATE TABLE IF NOT EXISTS users (
			id SERIAL PRIMARY KEY,
			username TEXT UNIQUE NOT NULL,
			email TEXT UNIQUE NOT NULL,
			progress JSONB DEFAULT '{}'
		);`)
	if err != nil {
		log.Fatalf("Unable to create users table: %v", err)
	}

	fmt.Println("Connected to PostgreSQL")
}
