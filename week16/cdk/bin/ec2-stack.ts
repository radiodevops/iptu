#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { Ec2Stack } from '../lib/ec2-stack';

// Get profile and region from environment variables or use defaults
const profile = process.env.AWS_PROFILE || 'default';
const region = process.env.CDK_DEFAULT_REGION || process.env.AWS_REGION || 'us-east-1';

const app = new cdk.App();
new Ec2Stack(app, 'ItpuEc2Stack', {
  env: { 
    account: process.env.CDK_DEFAULT_ACCOUNT, 
    region: region
  },
  description: `ITPU EC2 instance with CDK (Profile: ${profile}, Region: ${region})`,
});

// Log the profile and region being used
console.log(`Using AWS Profile: ${profile}`);
console.log(`Using AWS Region: ${region}`);
