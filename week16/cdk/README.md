# AWS CDK EC2 Instance Provisioning

This project uses AWS CDK to provision an EC2 instance with similar configuration to the Azure VMs created with Terraform and Pulumi.

## Prerequisites

- AWS CLI installed and configured
- AWS CDK v2 installed (`npm install -g aws-cdk`)
- Node.js (v16+) and npm
- TypeScript (v4.9+)
- SSH key pair named `ubuntu-itpu_key` in `~/.ssh/` directory

## Project Structure

```
cdk/
├── bin/
│   └── ec2-stack.ts         # CDK app entry point
├── lib/
│   └── ec2-stack.ts         # EC2 stack definition
├── cdk.json                 # CDK configuration
├── package.json             # Node.js dependencies
└── tsconfig.json            # TypeScript configuration
```

## Deployment Steps

### Using Default Profile and Region

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
```

### Using Specific Profile and Region

You can specify the AWS profile and region in several ways:

#### 1. Using Environment Variables

```bash
# Set environment variables
export AWS_PROFILE=dev
export AWS_REGION=us-east-1

# Deploy with these settings
cdk deploy
```

#### 2. Using Command Line Parameters

```bash
# Deploy with specific profile and region
cdk deploy --profile dev --region us-east-1
```

#### 3. Using NPM Scripts

We've added convenience scripts in package.json:

```bash
# Deploy using dev profile
npm run deploy:dev

# Deploy using prod profile
npm run deploy:prod
```

## Integration with Ansible

After deploying the CDK stack, run the inventory script to generate the Ansible inventory:

```bash
cd ../ansible

# Using default profile and region
./cdk_inventory.sh

# Or specify profile and region
./cdk_inventory.sh dev us-east-1
```

Then run the Ansible playbook to install Nginx:

```bash
ansible-playbook install_nginx.yml -i inventory.yml --extra-vars "@cdk_inventory.yml"
```

## Cleanup

To avoid unexpected AWS charges, remember to destroy the resources when they're no longer needed:

```bash
# Using default profile
cd ../cdk
cdk destroy

# Using specific profile and region
cd ../cdk
AWS_PROFILE=dev AWS_REGION=us-east-1 cdk destroy
```

## Notes

- The EC2 instance is provisioned with Ubuntu 24.04 LTS
- The instance type is t3.small (2 vCPUs, 2 GB RAM)
- The security group allows SSH (port 22) and HTTP (port 80) traffic
- The instance has a 30 GB EBS volume
- SSM is enabled for additional management capabilities
- Resources are tagged with the AWS profile used for deployment
