# Multi-Database School Management System

This project demonstrates a school management system using both PostgreSQL and MongoDB databases running in Docker containers. It includes sample data and CRUD operation examples for both databases.

## Project Structure

```
.
├── docker-compose.yaml          # Docker services configuration
├── .env.example                # Environment variables template
├── Makefile                    # Common commands
├── db/
│   ├── postgres/
│   │   └── init-scripts/      # PostgreSQL initialization
│   │       └── 01-init.sql
│   └── mongo/
│       └── init-scripts/      # MongoDB initialization
│           ├── init-mongo.js
│           └── schema-validation.js
├── docs/
│   ├── postgres.md            # PostgreSQL CRUD examples
│   └── mongo.md               # MongoDB CRUD examples
├── scripts/
│   ├── backup.sh              # Database backup script
│   └── restore.sh             # Database restore script
└── README.md
```

## Prerequisites

- Docker
- Docker Compose

## Getting Started

1. Clone this repository
2. Start the containers:
   ```bash
   docker compose up -d
   ```
3. Verify both containers are running:
   ```bash
   docker ps
   ```

## Database Access

### PostgreSQL
- **Host**: localhost
- **Port**: 5432
- **Database**: school_db
- **Username**: teacher
- **Password**: password123

Connect using:
```bash
docker exec -it postgres-demo psql -U teacher -d school_db
```

### MongoDB
- **Host**: localhost
- **Port**: 27017
- **Database**: school_db_mongo
- **Username**: mongoadmin
- **Password**: password123

Connect using:
```bash
docker exec -it mongo-demo mongosh -u mongoadmin -p password123 --authenticationDatabase admin school_db_mongo
```

## Data Model

Both databases contain the following collections/tables:
- students
- courses
- enrollments

### Sample Data
- 5 students
- 5 courses
- 10 enrollments

## Usage Examples

- See `docs/postgres.md` for PostgreSQL CRUD operation examples
- See `docs/mongo.md` for MongoDB CRUD operation examples

## Backup and Restore

The project includes scripts for backing up and restoring both databases.

### Creating a Backup

```bash
# Create a backup of both databases
make backup
```

This will create timestamped backup files in the `backups/` directory.

### Restoring from Backup

```bash
# Restore from backup files
make restore POSTGRES_BACKUP=./backups/postgres_backup_20250405_130000.sql MONGO_BACKUP=./backups/mongodb_backup_20250405_130000
```

## Health Checks

To verify the health of your database services:

```bash
make health
```

## Security Best Practices

1. **Environment Variables**:
   - Never commit `.env` files
   - Use `.env.example` as a template
   - Rotate credentials regularly

2. **Database Security**:
   - Change default credentials in production
   - Limit network exposure (bind to 127.0.0.1 in development)
   - Enable TLS for production connections

3. **File Permissions**:
   ```bash
   chmod 600 .env
   chmod 750 init-scripts/
   ```

4. **Container Security**:
   - Use non-root users in containers
   - Regularly update base images
   - Scan images for vulnerabilities

## Stopping the Services

To stop and remove the containers:
```bash
docker compose down
```

To stop and remove the containers along with the volumes (this will delete all data):
```bash
docker compose down -v
```
