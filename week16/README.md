# Cloud Infrastructure Provisioning with IaC Tools

This project demonstrates how to provision cloud infrastructure using different Infrastructure as Code (IaC) tools (Terraform, Pulumi, and AWS CDK) and configure them using Ansible. The project provisions VMs on Azure (using Terraform and Pulumi) and EC2 instances on AWS (using CDK).

## Prerequisites

- Azure CLI installed and authenticated (`az login`) for Azure deployments
- AWS CLI installed and configured for AWS deployments
- Terraform (v1.0.0+)
- Pulumi CLI and Node.js (v16+)
- AWS CDK v2 (`npm install -g aws-cdk`) for AWS deployments
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
│   ├── terraform_inventory.sh    # Script to generate Terraform inventory
│   └── cdk_inventory.sh          # Script to generate CDK inventory
├── cdk/
│   ├── bin/
│   │   └── ec2-stack.ts          # CDK app entry point
│   ├── lib/
│   │   └── ec2-stack.ts          # EC2 stack definition
│   ├── cdk.json                  # CDK configuration
│   ├── package.json              # Node.js dependencies
│   └── tsconfig.json             # TypeScript configuration
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

## Step 3: Provision AWS Resources with CDK

```bash
# Navigate to the CDK directory
cd cdk

# Install dependencies
npm install

# Bootstrap CDK (first time only)
cdk bootstrap

# Deploy the stack
cdk deploy

# Once completed, output the EC2 instance information
aws cloudformation describe-stacks --stack-name ItpuEc2Stack --query "Stacks[0].Outputs"

# Alternatively, specify profile and region
# cdk deploy --profile dev --region us-east-1
```

## Step 4: Generate Ansible Inventory from Terraform, Pulumi, and CDK

```bash
# Navigate to the Ansible directory
cd ansible

# Make the scripts executable
chmod +x terraform_inventory.sh pulumi_inventory.sh cdk_inventory.sh

# Generate inventory from Terraform outputs
./terraform_inventory.sh

# Generate inventory from Pulumi outputs
./pulumi_inventory.sh

# Generate inventory from CDK outputs
./cdk_inventory.sh
# Or specify profile and region for CDK
# ./cdk_inventory.sh dev us-east-1
```

## Step 5: Run Ansible Playbook to Install Nginx

```bash
# Include all generated inventory files
ansible-playbook install_nginx.yml -i inventory.yml --extra-vars "@terraform_inventory.yml" --extra-vars "@pulumi_inventory.yml" --extra-vars "@cdk_inventory.yml"
```

After running the playbook, Nginx will be installed and started on both VMs. You can access the web server using the public IP addresses of the VMs.

## Verifying the Setup

1. Check if the VMs are running in the Azure portal or EC2 instances in AWS Management Console
2. SSH into the Azure VMs using: `ssh -i ~/.ssh/ubuntu-itpu_key azureuser@<VM_PUBLIC_IP>`
3. SSH into the AWS EC2 instances using: `ssh -i ~/.ssh/ubuntu-itpu_key ubuntu@<EC2_PUBLIC_IP>`
4. Access the Nginx web server: `http://<VM_PUBLIC_IP>` in your browser

## Cleanup

To avoid unexpected cloud charges, remember to destroy the resources when they're no longer needed:

```bash
# For Terraform resources (Azure)
cd terraform
terraform destroy

# For Pulumi resources (Azure)
cd pulumi
pulumi destroy

# For CDK resources (AWS)
cd cdk
cdk destroy
# Or with specific profile and region
# AWS_PROFILE=dev AWS_REGION=us-east-1 cdk destroy
```

## Notes

- The SSH key `ubuntu-itpu_key` must exist in your `~/.ssh/` directory
- Azure VMs are configured with Ubuntu 24.04, 2 vCPUs, 4 GB RAM, and 20 GB disk
- AWS EC2 instance is configured with Ubuntu 24.04, 2 vCPUs, 2 GB RAM, and 30 GB disk
- The Nginx configuration includes a custom index page showing the VM/instance details
- Make sure Azure CLI is authenticated before running Terraform or Pulumi commands
- Make sure AWS CLI is configured with proper credentials before running CDK commands
- If you encounter TypeScript errors in the Pulumi or CDK configuration:
  - Ensure you have run `npm install` in the respective directory
  - Check that `tsconfig.json` exists and is properly configured
  - Verify that the package.json has all the required dependencies and types

## Troubleshooting

### Pulumi and CDK TypeScript Issues
If you see errors like "Cannot find module '@pulumi/pulumi' or its corresponding type declarations", make sure to:
1. Run `npm install` in the respective directory (pulumi or cdk)
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

### AWS Authentication
If you encounter authentication issues:
1. Configure AWS CLI with `aws configure`
2. Verify your configuration with `aws sts get-caller-identity`
3. Set a specific profile if needed: `export AWS_PROFILE=dev`
