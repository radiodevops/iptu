import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';
import * as fs from 'fs';
import * as path from 'path';

export interface Ec2StackProps extends cdk.StackProps {
  profile?: string;
}

export class Ec2Stack extends cdk.Stack {
  public readonly instancePublicIp: cdk.CfnOutput;
  public readonly instanceHostname: cdk.CfnOutput;
  public readonly instanceUsername: cdk.CfnOutput;

  constructor(scope: Construct, id: string, props?: Ec2StackProps) {
    super(scope, id, props);

    // Get the profile from props or environment variable
    const profile = props?.profile || process.env.AWS_PROFILE || 'default';
    
    // Add a tag to resources to indicate which profile was used
    cdk.Tags.of(this).add('profile', profile);

    // Create a VPC
    const vpc = new ec2.Vpc(this, 'ItpuVpc', {
      maxAzs: 2,
      natGateways: 0,
      subnetConfiguration: [
        {
          cidrMask: 24,
          name: 'public',
          subnetType: ec2.SubnetType.PUBLIC,
        }
      ],
    });

    // Create a security group for the EC2 instance
    const securityGroup = new ec2.SecurityGroup(this, 'ItpuSecurityGroup', {
      vpc,
      description: 'Allow SSH (TCP port 22) and HTTP (TCP port 80) in',
      allowAllOutbound: true,
    });

    // Add inbound rules
    securityGroup.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(22),
      'Allow SSH access from anywhere'
    );

    securityGroup.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(80),
      'Allow HTTP access from anywhere'
    );

    // Get the latest Ubuntu 22.04 LTS AMI
    const ubuntuImage = ec2.MachineImage.fromSsmParameter(
      '/aws/service/canonical/ubuntu/server/22.04/stable/current/amd64/hvm/ebs-gp2/ami-id',
      {
        os: ec2.OperatingSystemType.LINUX,
      }
    );

    // Read the SSH public key
    const sshKeyPath = path.join(process.env.HOME || '', '.ssh', 'ubuntu-itpu_key.pub');
    const sshPublicKey = fs.readFileSync(sshKeyPath, 'utf8');

    // Create a key pair using the proper Key Pair resource
    const keyPairName = `itpu-cdk-key-${profile}`;
    const keyPair = new ec2.KeyPair(this, 'ItpuKeyPair', {
      keyPairName: keyPairName,
      type: ec2.KeyPairType.ED25519,
      publicKeyMaterial: sshPublicKey,
    });

    // Create the EC2 instance
    const instance = new ec2.Instance(this, 'ItpuInstance', {
      vpc,
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T3, ec2.InstanceSize.SMALL), // t3.small ~ 2 vCPUs, 2 GB RAM
      machineImage: ubuntuImage,
      securityGroup,
      keyPair: keyPair,
      vpcSubnets: {
        subnetType: ec2.SubnetType.PUBLIC,
      },
      blockDevices: [
        {
          deviceName: '/dev/sda1',
          volume: ec2.BlockDeviceVolume.ebs(30, {
            volumeType: ec2.EbsDeviceVolumeType.GP3,
          }),
        },
      ],
    });

    // Add tags to the instance
    cdk.Tags.of(instance).add('Name', `itpu-ec2-${profile}`);
    cdk.Tags.of(instance).add('Project', 'ITPU');
    cdk.Tags.of(instance).add('Environment', 'Development');

    // Allow the instance to be SSM managed
    instance.role.addManagedPolicy(
      iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonSSMManagedInstanceCore')
    );

    // Output the instance's public IP address
    this.instancePublicIp = new cdk.CfnOutput(this, 'InstancePublicIp', {
      value: instance.instancePublicIp,
      description: 'Public IP address of the EC2 instance',
      exportName: 'ItpuCdkInstancePublicIp',
    });

    // Output the instance's hostname
    this.instanceHostname = new cdk.CfnOutput(this, 'InstanceHostname', {
      value: instance.instanceId,
      description: 'Instance ID of the EC2 instance',
      exportName: 'ItpuCdkInstanceId',
    });

    // Output the instance's username
    this.instanceUsername = new cdk.CfnOutput(this, 'InstanceUsername', {
      value: 'ubuntu',
      description: 'Username for the EC2 instance',
      exportName: 'ItpuCdkInstanceUsername',
    });

    // Output the AWS profile used
    new cdk.CfnOutput(this, 'AwsProfile', {
      value: profile,
      description: 'AWS profile used for deployment',
      exportName: 'ItpuCdkAwsProfile',
    });
  }
}
