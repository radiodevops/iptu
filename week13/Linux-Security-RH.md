# Linux Security Hands-On Practice Guide (Alma Linux / RHEL)

This guide provides practical exercises for essential Linux security tasks on Alma Linux (Red Hat family), including user management, file permissions, firewall configuration, security auditing, and system hardening.

## 1. User and Group Management

### Creating Groups (Prerequisite)

```bash
# Create groups if they don't exist
sudo groupadd developers
sudo groupadd docker
```

### Installing Docker from the Official Repository

```bash
# Remove old versions if present
sudo dnf remove docker docker-client docker-client-latest docker-common docker-latest docker-latest-logrotate docker-logrotate docker-engine

# Set up the repository
sudo dnf -y install dnf-plugins-core
sudo dnf config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo

# Install Docker Engine, CLI, containerd
sudo dnf install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Start and enable Docker
sudo systemctl start docker
sudo systemctl enable docker

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
# Install firewalld if not installed
sudo dnf install firewalld

# Start and enable firewalld
sudo systemctl start firewalld
sudo systemctl enable firewalld

# Allow SSH and HTTP
sudo firewall-cmd --permanent --add-service=ssh
sudo firewall-cmd --permanent --add-service=http

# Reload firewall to apply changes
sudo firewall-cmd --reload

# Check firewall status
sudo firewall-cmd --state
sudo firewall-cmd --list-all
```

## 4. Security Auditing

```bash
# Install Lynis for security auditing
sudo dnf install epel-release
sudo dnf install lynis

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
sudo dnf update -y
```

### Set up automatic security updates

```bash
# Install dnf-automatic if not present
sudo dnf install dnf-automatic

# Enable and start automatic updates
sudo systemctl enable --now dnf-automatic.timer
```

### Limit sudo access

```bash
# Check who has sudo access
grep '^sudo' /etc/group

# Remove unnecessary users from sudo group
sudo gpasswd -d username sudo
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
# Install cracklib if not present
sudo dnf install cracklib-dicts

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
sudo grep "Failed password" /var/log/secure

# View recent sudo activity
sudo grep "sudo" /var/log/secure

# Use journalctl for real-time monitoring
sudo journalctl -f
```

---

