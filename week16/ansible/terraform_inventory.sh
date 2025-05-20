#!/bin/bash

# Script to generate Ansible inventory from Terraform outputs
# Run this after terraform apply

TERRAFORM_DIR="../terraform"
INVENTORY_FILE="terraform_inventory.yml"

# Get outputs from Terraform
cd $TERRAFORM_DIR
IP_ADDRESS=$(terraform output -raw terraform_vm_public_ip)
HOSTNAME=$(terraform output -raw terraform_vm_hostname)
USERNAME=$(terraform output -raw terraform_vm_username)
cd - > /dev/null

# Generate inventory file
cat > $INVENTORY_FILE << EOF
---
terraform_vm_public_ip: $IP_ADDRESS
terraform_vm_hostname: $HOSTNAME
terraform_vm_username: $USERNAME
EOF

echo "Terraform inventory generated at $INVENTORY_FILE"
