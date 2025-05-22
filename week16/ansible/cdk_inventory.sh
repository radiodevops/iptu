#!/bin/bash

# Script to generate Ansible inventory from CDK outputs
# Run this after cdk deploy

CDK_DIR="../cdk"
INVENTORY_FILE="cdk_inventory.yml"

# Get AWS profile and region from arguments or use defaults
AWS_PROFILE=${1:-default}
AWS_REGION=${2:-us-east-1}

echo "Using AWS Profile: $AWS_PROFILE"
echo "Using AWS Region: $AWS_REGION"

# Get outputs from CDK
cd $CDK_DIR
IP_ADDRESS=$(AWS_PROFILE=$AWS_PROFILE aws cloudformation describe-stacks --stack-name ItpuEc2Stack --region $AWS_REGION --query "Stacks[0].Outputs[?ExportName=='ItpuCdkInstancePublicIp'].OutputValue" --output text)
HOSTNAME=$(AWS_PROFILE=$AWS_PROFILE aws cloudformation describe-stacks --stack-name ItpuEc2Stack --region $AWS_REGION --query "Stacks[0].Outputs[?ExportName=='ItpuCdkInstanceId'].OutputValue" --output text)
USERNAME=$(AWS_PROFILE=$AWS_PROFILE aws cloudformation describe-stacks --stack-name ItpuEc2Stack --region $AWS_REGION --query "Stacks[0].Outputs[?ExportName=='ItpuCdkInstanceUsername'].OutputValue" --output text)
cd - > /dev/null

# Generate inventory file
cat > $INVENTORY_FILE << EOF
---
cdk_vm_public_ip: $IP_ADDRESS
cdk_vm_hostname: $HOSTNAME
cdk_vm_username: $USERNAME
aws_profile: $AWS_PROFILE
aws_region: $AWS_REGION
EOF

echo "CDK inventory generated at $INVENTORY_FILE"
