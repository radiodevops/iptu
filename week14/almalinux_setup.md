# AlmaLinux Setup Guide for WordPress Stack

## System Update and Basic Tools

```bash
# Update the system
sudo dnf update -y
sudo dnf upgrade -y

# Install basic tools
sudo dnf install -y dnf-utils yum-utils
sudo dnf install -y git wget curl
```

## Installing Docker

```bash
# Add Docker repository
sudo dnf config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo

# Install Docker packages
sudo dnf install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Start and enable Docker service
sudo systemctl start docker
sudo systemctl enable docker

# Add current user to docker group
sudo usermod -aG docker $USER
newgrp docker

# Verify Docker installation
docker --version
docker compose version
```

## Installing Docker Compose

```bash
# Download Docker Compose binary
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

# Make it executable
sudo chmod +x /usr/local/bin/docker-compose

# Verify installation
docker-compose --version
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

## Firewall Configuration

```bash
# Install firewalld if not present
sudo dnf install -y firewalld

# Start and enable firewalld
sudo systemctl start firewalld
sudo systemctl enable firewalld

# Allow HTTP traffic
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https

# Reload firewall
sudo firewall-cmd --reload
```

## SELinux Configuration (if enabled)

```bash
# Install SELinux tools
sudo dnf install -y policycoreutils-python-utils

# Allow container access to host filesystem
sudo setsebool -P container_manage_cgroup 1

# If using custom ports, add SELinux port context
sudo semanage port -a -t http_port_t -p tcp 80
```

## System Maintenance

```bash
# Enable automatic updates (optional)
sudo dnf install -y dnf-automatic

# Configure automatic updates
sudo sed -i 's/apply_updates = no/apply_updates = yes/' /etc/dnf/automatic.conf

# Start and enable automatic updates
sudo systemctl enable --now dnf-automatic.timer
```

## Monitoring Stack Health

```bash
# View running containers
docker compose ps

# View container logs
docker compose logs -f

# Monitor resource usage
docker stats
```
