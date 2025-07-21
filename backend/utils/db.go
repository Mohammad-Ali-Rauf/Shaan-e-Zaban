package utils

import (
	"context"
	"fmt"
	"log"

	"github.com/jackc/pgx/v5/pgxpool"
)

var DB *pgxpool.Pool

func InitDB() {
	dbUrl := "postgres://mein_khud:chaiwalekapassword@localhost:5432/shaan_e_zaban_db"

	var err error
	DB, err = pgxpool.New(context.Background(), dbUrl)
	if err != nil {
		log.Fatalf("Unable to connect to DB: %v", err)
	}

	// Test connection
	err = DB.Ping(context.Background())
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

	if err != nil {
		log.Fatalf("Unable to ping DB: %v", err)
	}

	fmt.Println("Connected to PostgreSQL")
}
