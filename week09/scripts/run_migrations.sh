#!/bin/bash
# Database migration script

POSTGRES_MIGRATIONS_DIR="./db/postgres/migrations"
MIGRATION_TRACKER="./db/postgres/migration_history.txt"

# Create migration history file if it doesn't exist
mkdir -p $(dirname "$MIGRATION_TRACKER")
touch "$MIGRATION_TRACKER"

echo "Starting PostgreSQL migrations..."

# Get all migration files sorted by version
migration_files=$(find "$POSTGRES_MIGRATIONS_DIR" -name "V*__*.sql" | sort)

for migration_file in $migration_files; do
    filename=$(basename "$migration_file")
    
    # Check if migration has already been applied
    if grep -q "$filename" "$MIGRATION_TRACKER"; then
        echo "Migration $filename already applied. Skipping."
        continue
    fi
    
    echo "Applying migration: $filename"
    
    # Run the migration
    cat "$migration_file" | docker exec -i postgres-demo psql -U teacher school_db
    
    if [ $? -eq 0 ]; then
        # Record successful migration
        echo "$filename applied at $(date)" >> "$MIGRATION_TRACKER"
        echo "Migration $filename applied successfully."
    else
        echo "Error applying migration $filename. Stopping."
        exit 1
    fi
done

echo "PostgreSQL migrations completed."
