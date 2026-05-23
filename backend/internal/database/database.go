package database

import (
	"fmt"
	"os"

	"github.com/glebarez/sqlite"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"

	"myapp/internal/model"
)

func Connect() (*gorm.DB, error) {
	driver := os.Getenv("DB_DRIVER")
	if driver == "" {
		driver = "sqlite"
	}

	switch driver {
	case "postgres":
		dsn := fmt.Sprintf(
			"host=%s user=%s password=%s dbname=%s port=%s sslmode=disable",
			getEnv("DB_HOST", "localhost"),
			getEnv("DB_USER", "postgres"),
			getEnv("DB_PASSWORD", "password"),
			getEnv("DB_NAME", "myapp"),
			getEnv("DB_PORT", "5432"),
		)
		return gorm.Open(postgres.Open(dsn), &gorm.Config{})

	default:
		return gorm.Open(sqlite.Open(getEnv("SQLITE_PATH", "myapp.db")), &gorm.Config{})
	}
}

func Migrate(db *gorm.DB) {
	db.AutoMigrate(&model.User{})
}

func getEnv(key, fallback string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return fallback
}
