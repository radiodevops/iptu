# Ubuntu 24.04 Setup Guide for WordPress Stack

## System Update and Basic Tools

```bash
# Update package lists and upgrade system
sudo apt update
sudo apt upgrade -y

# Install basic tools
sudo apt install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    software-properties-common \
    git \
    wget
```

## Installing Docker

```bash
# Add Docker's official GPG key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Add Docker repository
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Update package lists
sudo apt update

# Install Docker packages
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Add current user to docker group
sudo usermod -aG docker $USER
newgrp docker

# Start and enable Docker service
sudo systemctl start docker
sudo systemctl enable docker

# Verify installation
docker --version
docker compose version
```

## Setting up WordPress Stack

1. Create project directory:
```bash
mkdir wordpress-stack
cd wordpress-stack
```

2. Create necessary configuration files (as shown in previous steps):
   - docker-compose.yml
   - nginx.conf
   - .env

3. Start the stack:
```bash
docker compose up -d
```

## Firewall Configuration (UFW)

```bash
# Install UFW if not present
sudo apt install -y ufw

# Allow SSH (before enabling UFW)
sudo ufw allow ssh

# Allow HTTP and HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Enable UFW
sudo ufw enable

# Check status
sudo ufw status
```

## System Maintenance

```bash
# Enable automatic security updates
sudo apt install -y unattended-upgrades

# Configure automatic updates
sudo dpkg-reconfigure -plow unattended-upgrades

# Check status
sudo systemctl status unattended-upgrades
```

## Performance Optimization

```bash
# Install system monitoring tools
sudo apt install -y htop iotop

# Install and configure system limits
sudo apt install -y sysfsutils

# Add system limits for Docker
cat << EOF | sudo tee /etc/sysctl.d/99-docker-performance.conf
# Docker performance tweaks
fs.inotify.max_user_watches = 524288
vm.max_map_count = 262144
EOF

# Apply changes
sudo sysctl --system
```

## Monitoring Stack Health

```bash
# View running containers
docker compose ps

# View container logs
docker compose logs -f

# Monitor resource usage
docker stats

# Monitor system resources
htop
```

## Backup Configuration

```bash
# Install backup tools
sudo apt install -y rsync

# Create backup directory
sudo mkdir -p /var/backups/wordpress-stack

# Create backup script
cat << 'EOF' | sudo tee /usr/local/bin/backup-wordpress.sh
#!/bin/bash
BACKUP_DIR="/var/backups/wordpress-stack"
DATE=$(date +%Y%m%d_%H%M%S)

# Backup Docker Compose files
rsync -av --delete /path/to/wordpress-stack/ $BACKUP_DIR/config_$DATE/

# Backup volumes (requires stopping containers)
docker compose down
tar -czf $BACKUP_DIR/volumes_$DATE.tar.gz /var/lib/docker/volumes/wordpress-stack_*
docker compose up -d
EOF

# Make script executable
sudo chmod +x /usr/local/bin/backup-wordpress.sh
```
