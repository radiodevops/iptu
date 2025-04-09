#!/bin/bash
# Database backup script

# Set timestamp for backup files
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_DIR="./backups"

# Create backup directory if it doesn't exist
mkdir -p $BACKUP_DIR

# PostgreSQL backup
echo "Backing up PostgreSQL database..."
docker exec postgres-demo pg_dump -U teacher school_db > $BACKUP_DIR/postgres_backup_$TIMESTAMP.sql
if [ $? -eq 0 ]; then
    echo "PostgreSQL backup completed: $BACKUP_DIR/postgres_backup_$TIMESTAMP.sql"
else
    echo "PostgreSQL backup failed!"
fi

# MongoDB backup
echo "Backing up MongoDB database..."
docker exec mongo-demo mongodump --username mongoadmin --password password123 --authenticationDatabase admin --db school_db_mongo --out /tmp/mongodump
docker cp mongo-demo:/tmp/mongodump $BACKUP_DIR/mongodb_backup_$TIMESTAMP
if [ $? -eq 0 ]; then
    echo "MongoDB backup completed: $BACKUP_DIR/mongodb_backup_$TIMESTAMP"
else
    echo "MongoDB backup failed!"
fi

echo "Backup completed at $(date)"
