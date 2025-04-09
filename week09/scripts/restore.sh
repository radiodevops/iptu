#!/bin/bash
# Database restore script

# Check if backup file is provided
if [ $# -ne 2 ]; then
    echo "Usage: $0 <postgres_backup_file> <mongodb_backup_dir>"
    echo "Example: $0 ./backups/postgres_backup_20250405_130000.sql ./backups/mongodb_backup_20250405_130000"
    exit 1
fi

POSTGRES_BACKUP=$1
MONGO_BACKUP=$2

# Check if backup files exist
if [ ! -f "$POSTGRES_BACKUP" ]; then
    echo "PostgreSQL backup file not found: $POSTGRES_BACKUP"
    exit 1
fi

if [ ! -d "$MONGO_BACKUP" ]; then
    echo "MongoDB backup directory not found: $MONGO_BACKUP"
    exit 1
fi

# PostgreSQL restore
echo "Restoring PostgreSQL database from $POSTGRES_BACKUP..."
cat $POSTGRES_BACKUP | docker exec -i postgres-demo psql -U teacher school_db
if [ $? -eq 0 ]; then
    echo "PostgreSQL restore completed."
else
    echo "PostgreSQL restore failed!"
    exit 1
fi

# MongoDB restore
echo "Restoring MongoDB database from $MONGO_BACKUP..."
docker cp $MONGO_BACKUP mongo-demo:/tmp/mongorestore
docker exec mongo-demo mongorestore --username mongoadmin --password password123 --authenticationDatabase admin --db school_db_mongo /tmp/mongorestore/school_db_mongo
if [ $? -eq 0 ]; then
    echo "MongoDB restore completed."
else
    echo "MongoDB restore failed!"
    exit 1
fi

echo "Restore completed at $(date)"
