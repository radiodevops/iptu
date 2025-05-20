#!/bin/bash

# Script to generate Ansible inventory from Pulumi outputs
# Run this after pulumi up

PULUMI_DIR="../pulumi"
INVENTORY_FILE="pulumi_inventory.yml"

# Get outputs from Pulumi
cd $PULUMI_DIR
IP_ADDRESS=$(pulumi stack output publicIpAddress)
HOSTNAME=$(pulumi stack output hostname)
USERNAME=$(pulumi stack output username)
cd - > /dev/null

# Generate inventory file
cat > $INVENTORY_FILE << EOF
---
pulumi_vm_public_ip: $IP_ADDRESS
pulumi_vm_hostname: $HOSTNAME
pulumi_vm_username: $USERNAME
EOF

echo "Pulumi inventory generated at $INVENTORY_FILE"
