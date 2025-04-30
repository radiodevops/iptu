# Linux Security Hands-On Practice Guide (Ubuntu 24.04)

This guide provides practical exercises for essential Linux security tasks on Ubuntu 24.04, including user management, file permissions, firewall configuration, security auditing, and system hardening.

## 1. User and Group Management

### Creating Groups (Prerequisite)

```bash
# Create groups if they don't exist
sudo groupadd developers
sudo groupadd docker
```

### Installing Docker from the Official Repository

```bash
# Update the apt package index and install prerequisites
sudo apt-get update
sudo apt-get install ca-certificates curl

# Add Docker’s official GPG key
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Set up the Docker repository
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo \"${UBUNTU_CODENAME:-$VERSION_CODENAME}\") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update

# Install Docker Engine, CLI, containerd, Buildx, and Compose plugin
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Verify installation
sudo docker run hello-world
```

### Creating a New User

```bash
# Create a new user with home directory and bash shell
sudo useradd -m -s /bin/bash johndoe

# Set password for the new user
sudo passwd johndoe
# Enter a strong password when prompted

# Verify the user was created
getent passwd johndoe
```

### Adding the User to Groups

```bash
# Add user to the 'developers' and 'docker' groups
sudo usermod -aG developers,docker johndoe

# Verify group membership
id johndoe
groups johndoe
```

### (Optional) Allow Docker Commands Without Sudo

```bash
# Activate new group membership (log out/in or use newgrp)
su - johndoe
# Or, for current session:
newgrp docker

# Test Docker without sudo
whoami
docker run hello-world
```

### Modifying User Information

```bash
# Change the user's shell to zsh
sudo usermod -s /bin/zsh johndoe

# Change the user's home directory
sudo usermod -d /home/new_home johndoe

# Verify changes
getent passwd johndoe
```

### Deleting a User

```bash
# Remove the user account but keep their home directory
sudo userdel johndoe

# Remove the user account and their home directory
sudo userdel -r johndoe
```

## 2. File Permissions

### Creating a File

```bash
# Create a sample file
touch sample_file.txt

# Add some content
echo "This is a test file for permissions" > sample_file.txt
```

### Checking Permissions

```bash
# View current permissions
ls -l sample_file.txt
# Output example: -rw-r--r-- 1 username groupname 35 Aug 10 15:30 sample_file.txt
```

### Modifying Permissions

#### Using Absolute Mode

```bash
# Give owner read/write/execute, group read/execute, others read-only
chmod 754 sample_file.txt

# Verify changes
ls -l sample_file.txt
# Output should be: -rwxr-xr-- 1 username groupname 35 Aug 10 15:30 sample_file.txt
```

#### Using Symbolic Mode

```bash
# Add execute permission for owner
chmod u+x sample_file.txt

# Remove write permission from group
chmod g-w sample_file.txt

# Add read permission for others
chmod o+r sample_file.txt

# Verify changes
ls -l sample_file.txt
```

### Special Permissions

```bash
# Set SUID bit (allows file to be executed with owner's permissions)
chmod u+s executable_file
ls -l executable_file
# Output will show: -rwsr-xr-x

# Set SGID bit (files created in directory inherit group ownership)
chmod g+s shared_directory
ls -ld shared_directory
# Output will show: drwxr-sr-x

# Set sticky bit (only file owner can delete files in directory)
chmod +t public_directory
ls -ld public_directory
# Output will show: drwxrwxrwt
```

## 3. Firewall Configuration

```bash
# Install UFW if not installed
sudo apt-get install ufw

# Allow SSH and HTTP
sudo ufw allow OpenSSH
sudo ufw allow http

# Enable UFW
sudo ufw enable

# Check firewall status
sudo ufw status verbose
```

## 4. Security Auditing

```bash
# Install Lynis for security auditing
sudo apt-get install lynis

# Run a basic security audit
sudo lynis audit system
```

## 5. System Hardening Checklist

### Disable root SSH login

```bash
# Edit the SSH server configuration
sudo nano /etc/ssh/sshd_config

# Find and set:
PermitRootLogin no

# Save and exit, then restart SSH
sudo systemctl restart sshd
```

### Use SSH keys instead of passwords

```bash
# Generate an SSH key pair on your client machine
ssh-keygen -t ed25519 -C "your_email@example.com"

# Copy your public key to the server
ssh-copy-id johndoe@server_ip

# Test SSH login (should not prompt for password)
ssh johndoe@server_ip
```

### Keep system and packages updated

```bash
# Update package lists and upgrade all packages
sudo apt-get update
sudo apt-get upgrade -y

# (Optional) Upgrade distribution
sudo apt-get dist-upgrade -y
```

### Set up automatic security updates

```bash
# Install unattended-upgrades if not present
sudo apt-get install unattended-upgrades

# Enable automatic updates
sudo dpkg-reconfigure --priority=low unattended-upgrades
```

### Limit sudo access

```bash
# Check who has sudo access
getent group sudo

# Remove unnecessary users from sudo group
sudo deluser username sudo
```

### Regularly review user accounts and groups

```bash
# List all users
cut -d: -f1 /etc/passwd

# List all groups
cut -d: -f1 /etc/group
```

### Configure strong password policies

```bash
# Install libpam-pwquality if not present
sudo apt-get install libpam-pwquality

# Edit password quality settings
sudo nano /etc/security/pwquality.conf

# Example settings to enforce strong passwords:
# minlen = 12
# dcredit = -1
# ucredit = -1
# ocredit = -1
# lcredit = -1

# Save and exit
```

### Monitor logs for suspicious activity

```bash
# Check authentication logs for failed logins
sudo grep "Failed password" /var/log/auth.log

# View recent sudo activity
sudo grep "sudo" /var/log/auth.log

# Use journalctl for real-time monitoring
sudo journalctl -f
```

---
