# Week 14: WordPress Stack with Docker Compose

This week focuses on setting up a modern WordPress stack using Docker Compose, featuring:
- Nginx as reverse proxy
- WordPress with PHP-FPM
- MySQL database
- Redis for caching

## Project Structure

```
week14/
├── docker-compose.yml     # Docker services configuration
├── nginx.conf            # Nginx reverse proxy configuration
├── .env                  # Environment variables
├── almalinux_setup.md    # AlmaLinux installation guide
└── ubuntu_setup.md       # Ubuntu 24.04 installation guide
```

## Stack Components

- **Nginx**: Acts as a reverse proxy, handling incoming requests and serving static content
- **WordPress**: PHP-FPM based WordPress installation
- **MySQL**: Database server for WordPress
- **Redis**: In-memory cache to improve WordPress performance

## Quick Start

1. Ensure Docker and Docker Compose are installed:
```bash
docker --version
docker compose version
```

2. Clone the repository and navigate to week14:
```bash
cd week14
```

3. Start the stack:
```bash
docker compose up -d
```

4. Access WordPress:
   - Open http://localhost in your browser
   - Follow the WordPress installation wizard

## Installation Guides

We provide detailed installation guides for two major Linux distributions:

- [AlmaLinux Setup Guide](almalinux_setup.md)
- [Ubuntu 24.04 Setup Guide](ubuntu_setup.md)

Each guide includes:
- System preparation
- Docker installation
- Security configurations
- Performance optimization
- Monitoring setup

## Environment Variables

The stack uses the following environment variables (defined in `.env`):

- `MYSQL_ROOT_PASSWORD`: MySQL root password
- `MYSQL_DATABASE`: WordPress database name
- `MYSQL_USER`: WordPress database user
- `MYSQL_PASSWORD`: WordPress database password
- `WORDPRESS_DB_*`: WordPress database connection settings
- `REDIS_*`: Redis connection settings

## Maintenance

### Viewing Logs
```bash
# All services
docker compose logs -f

# Specific service
docker compose logs -f nginx
```

### Stopping the Stack
```bash
docker compose down
```

### Backup
```bash
# Stop the stack
docker compose down

# Backup volumes
tar -czf wordpress_backup.tar.gz /var/lib/docker/volumes/week14_*

# Restart the stack
docker compose up -d
```

## Troubleshooting

1. **502 Bad Gateway**
   - Check if WordPress container is running
   - Verify Nginx configuration
   - Check PHP-FPM connection settings

2. **Database Connection Issues**
   - Verify environment variables in `.env`
   - Check MySQL container logs
   - Ensure MySQL service is running

3. **Performance Issues**
   - Monitor Redis cache usage
   - Check MySQL slow query log
   - Review Nginx access logs
