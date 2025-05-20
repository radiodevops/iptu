variable "resource_group_name" {
  description = "Name of the resource group"
  default     = "itpu-rg"
}

variable "location" {
  description = "Azure region where resources will be created"
  default     = "East US"
}

variable "vm_size" {
  description = "Size of the VM"
  default     = "Standard_B2s"  # 2 vCPUs, 4 GB RAM
}

variable "admin_username" {
  description = "Admin username for the VM"
  default     = "azureuser"
}

variable "ssh_key_path" {
  description = "Path to the SSH public key"
  default     = "~/.ssh/ubuntu-itpu_key.pub"
}

variable "subscription_id" {
  description = "Azure subscription ID"
  default     = "e4dcae27-d007-40e6-957c-6ede634dc26a"
}
