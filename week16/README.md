# Azure VM Provisioning with IaC Tools

This project demonstrates how to provision Azure VMs using different Infrastructure as Code (IaC) tools (Terraform and Pulumi) and configure them using Ansible.

## Prerequisites

- Azure CLI installed and authenticated (`az login`)
- Terraform (v1.0.0+)
- Pulumi CLI and Node.js (v16+)
- TypeScript (v4.9+)
- Ansible (v2.9+)
- SSH key pair named `ubuntu-itpu_key` in `~/.ssh/` directory

## Project Structure

```
week16/
├── ansible/
│   ├── install_nginx.yml         # Ansible playbook to install Nginx
│   ├── inventory.yml             # Main Ansible inventory file
│   ├── pulumi_inventory.sh       # Script to generate Pulumi inventory
│   └── terraform_inventory.sh    # Script to generate Terraform inventory
├── pulumi/
│   ├── index.ts                  # Pulumi TypeScript code for Azure VM
│   ├── package.json              # Node.js dependencies
│   ├── tsconfig.json             # TypeScript configuration
│   └── Pulumi.yaml               # Pulumi project configuration
├── terraform/
│   ├── main.tf                   # Terraform configuration for Azure VM
│   └── variables.tf              # Terraform variables
└── README.md                     # This file
```

## Step 1: Provision Azure Resources with Terraform

```bash
# Navigate to the Terraform directory
cd terraform

# Initialize Terraform
terraform init

# Review the execution plan
terraform plan

# Apply the configuration
terraform apply

# Once completed, output the VM information
terraform output
```

## Step 2: Provision Azure Resources with Pulumi

```bash
# Navigate to the Pulumi directory
cd pulumi

# Install dependencies (this is required to resolve TypeScript errors)
npm install

# Verify your package.json has these dependencies
# @pulumi/pulumi: ^3.78.0 or later
# @pulumi/azure-native: ^2.12.0 or later
# @types/node: ^18.15.0 or later
# typescript: ^4.9.0 or later

# Initialize a new Pulumi stack (first time only)
pulumi stack init dev

# Set Azure as the cloud provider
pulumi config set azure-native:location eastus

# Login to Azure (if not already logged in)
az login

# Preview the changes
pulumi preview

# Deploy the resources
pulumi up

# Once completed, output the VM information
pulumi stack output
```

## Step 3: Generate Ansible Inventory from Terraform and Pulumi

```bash
# Navigate to the Ansible directory
cd ansible

# Make the scripts executable
chmod +x terraform_inventory.sh pulumi_inventory.sh

# Generate inventory from Terraform outputs
./terraform_inventory.sh

# Generate inventory from Pulumi outputs
./pulumi_inventory.sh
```

## Step 4: Run Ansible Playbook to Install Nginx

```bash
# First, include the generated inventory files
ansible-playbook install_nginx.yml -i inventory.yml --extra-vars "@terraform_inventory.yml" --extra-vars "@pulumi_inventory.yml"
```

After running the playbook, Nginx will be installed and started on both VMs. You can access the web server using the public IP addresses of the VMs.

## Verifying the Setup

1. Check if the VMs are running in the Azure portal
2. SSH into the VMs using: `ssh -i ~/.ssh/ubuntu-itpu_key azureuser@<VM_PUBLIC_IP>`
3. Access the Nginx web server: `http://<VM_PUBLIC_IP>` in your browser

## Cleanup

To avoid unexpected Azure charges, remember to destroy the resources when they're no longer needed:

```bash
# For Terraform resources
cd terraform
terraform destroy

# For Pulumi resources
cd pulumi
pulumi destroy
```

## Notes

- The SSH key `ubuntu-itpu_key` must exist in your `~/.ssh/` directory
- Both VMs are configured with Ubuntu 24.04, 2 vCPUs, 4 GB RAM, and 20 GB disk
- The Nginx configuration includes a custom index page showing the VM details
- Make sure Azure CLI is authenticated before running Terraform or Pulumi commands
- If you encounter TypeScript errors in the Pulumi configuration:
  - Ensure you have run `npm install` in the pulumi directory
  - Check that `tsconfig.json` exists and is properly configured
  - Verify that the package.json has all the required dependencies and types

## Troubleshooting

### Pulumi TypeScript Issues
If you see errors like "Cannot find module '@pulumi/pulumi' or its corresponding type declarations", make sure to:
1. Run `npm install` in the pulumi directory
2. Check that your TypeScript version is compatible (v4.9+ recommended)
3. Verify that the tsconfig.json file exists and is properly configured

### SSH Key Issues
If you have problems with SSH access:
1. Ensure the key is properly generated: `ssh-keygen -t rsa -b 4096 -f ~/.ssh/ubuntu-itpu_key`
2. Set proper permissions: `chmod 600 ~/.ssh/ubuntu-itpu_key`
3. The public key should be at `~/.ssh/ubuntu-itpu_key.pub`

### Azure Authentication
If you encounter authentication issues:
1. Run `az login` to authenticate with Azure
2. Verify your subscription with `az account show`
3. Set a specific subscription if needed: `az account set --subscription <ID>`
