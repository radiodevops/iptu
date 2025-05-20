import * as pulumi from "@pulumi/pulumi";
import * as azure from "@pulumi/azure-native";
import * as fs from "fs";
import * as path from "path";

// Create an Azure Resource Group
const resourceGroup = new azure.resources.ResourceGroup("itpu-rg-pulumi", {
    resourceGroupName: "itpu-rg-pulumi",
    location: "eastus",
});

// Create a Virtual Network
const virtualNetwork = new azure.network.VirtualNetwork("itpu-vnet-pulumi", {
    resourceGroupName: resourceGroup.name,
    addressSpace: {
        addressPrefixes: ["10.0.0.0/16"],
    },
    location: resourceGroup.location,
});

// Create a Subnet
const subnet = new azure.network.Subnet("itpu-subnet-pulumi", {
    resourceGroupName: resourceGroup.name,
    virtualNetworkName: virtualNetwork.name,
    addressPrefix: "10.0.1.0/24",
});

// Create a Public IP Address
const publicIp = new azure.network.PublicIPAddress("itpu-public-ip-pulumi", {
    resourceGroupName: resourceGroup.name,
    location: resourceGroup.location,
    publicIPAllocationMethod: "Dynamic",
});

// Create a Network Security Group
const nsg = new azure.network.NetworkSecurityGroup("itpu-nsg-pulumi", {
    resourceGroupName: resourceGroup.name,
    location: resourceGroup.location,
    securityRules: [
        {
            name: "SSH",
            priority: 1001,
            direction: "Inbound",
            access: "Allow",
            protocol: "Tcp",
            sourcePortRange: "*",
            destinationPortRange: "22",
            sourceAddressPrefix: "*",
            destinationAddressPrefix: "*",
        },
        {
            name: "HTTP",
            priority: 1002,
            direction: "Inbound",
            access: "Allow",
            protocol: "Tcp",
            sourcePortRange: "*",
            destinationPortRange: "80",
            sourceAddressPrefix: "*",
            destinationAddressPrefix: "*",
        },
    ],
});

// Create a Network Interface
const nic = new azure.network.NetworkInterface("itpu-nic-pulumi", {
    resourceGroupName: resourceGroup.name,
    location: resourceGroup.location,
    ipConfigurations: [{
        name: "internal",
        subnet: {
            id: subnet.id,
        },
        privateIPAllocationMethod: "Dynamic",
        publicIPAddress: {
            id: publicIp.id,
        },
    }],
    networkSecurityGroup: {
        id: nsg.id,
    },
});

// Read the SSH public key
const sshPublicKeyPath = path.join(process.env.HOME || process.env.USERPROFILE || "", ".ssh", "ubuntu-itpu_key.pub");
const sshPublicKey = fs.readFileSync(sshPublicKeyPath, "utf8");

// Create a Virtual Machine
const vm = new azure.compute.VirtualMachine("itpu-vm-pulumi", {
    resourceGroupName: resourceGroup.name,
    location: resourceGroup.location,
    hardwareProfile: {
        vmSize: "Standard_B2s", // 2 vCPUs, 4 GB RAM
    },
    networkProfile: {
        networkInterfaces: [{
            id: nic.id,
            primary: true,
        }],
    },
    osProfile: {
        computerName: "itpu-vm-pulumi",
        adminUsername: "azureuser",
        linuxConfiguration: {
            disablePasswordAuthentication: true,
            ssh: {
                publicKeys: [{
                    path: "/home/azureuser/.ssh/authorized_keys",
                    keyData: sshPublicKey,
                }],
            },
        },
    },
    storageProfile: {
        osDisk: {
            createOption: "FromImage",
            managedDisk: {
                storageAccountType: "Standard_LRS",
            },
            diskSizeGB: 30,
        },
        imageReference: {
            publisher: "Canonical",
            offer: "ubuntu-24_04-lts",
            sku: "server",
            version: "24.04.202504080",
        },
    },
});

// Export the VM's IP address
// Export the VM's public IP address as a string (for inventory scripts)
export const publicIpAddress = publicIp.ipAddress.apply(ip => ip || "");
export const hostname = vm.name;
export const username = "azureuser";
