# Linux Networking Workshop

This repository contains hands-on exercises for learning Linux networking concepts. These exercises provide practical implementation of network configuration and troubleshooting techniques required for Linux system administrators and network engineers.

## Overview

The Linux Networking Exercises guide offers comprehensive, hands-on instructions for mastering essential networking skills in Linux environments. The workshop includes:

- Network interfaces and configuration tools
- Static and dynamic IP addressing
- DNS configuration
- ARP and network discovery
- Firewall configuration
- Network monitoring tools
- systemd-networkd
- Network routing
- Network namespaces

## Getting Started

### Prerequisites

To complete these exercises, you will need:

- A Linux system (physical machine, virtual machine, or WSL)
- Root/sudo access
- Basic understanding of Linux command line operations

### Using the Exercises

1. Begin by cloning this repository or downloading the exercise files
2. Open the `Linux_Networking_Exercises.md` file
3. Follow the exercises in sequential order for the best learning experience
4. Each exercise builds on concepts from previous ones

## Exercise Structure

Each exercise follows a consistent format:

1. **Objective**: What you'll learn
2. **Steps**: Detailed instructions to follow
3. **Commands**: Linux commands to execute
4. **Expected Output**: What you should observe (where applicable)

## Important Notes

- **Backup Configuration**: Always back up your network configuration files before making changes
- **Network Disruption**: Some exercises may temporarily affect your network connectivity
- **System Differences**: Commands and file locations may vary slightly between Linux distributions
- **Root Access**: Most network configuration requires elevated privileges (sudo/root)

## Troubleshooting

If you encounter issues during the exercises:

- Check your syntax carefully
- Verify interface names (they differ between systems)
- Ensure you have the necessary permissions
- Revert to your backup configurations if needed
- Reboot if your network becomes unresponsive

## Additional Resources

- [Network Configuration Reference](https://www.networkmanager.dev/)
- [systemd-networkd Documentation](https://www.freedesktop.org/software/systemd/man/systemd-networkd.service.html)
- [Netplan Configuration Examples](https://netplan.io/examples)
- [Linux Network Administrators Guide](https://www.tldp.org/LDP/nag2/index.html)
- [Red Hat Enterprise Linux Networking Guide](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/7/html/networking_guide/index)
- [Ubuntu Network Configuration](https://ubuntu.com/server/docs/network-configuration)

## Workshop Structure

The workshop consists of the following main components:

1. **README.md** - This file, providing an overview and instructions
2. **Linux_Networking_Exercises.md** - The main exercise document containing all hands-on activities
3. **resources/** - Additional reference materials and helpful scripts

## License

This material is provided for educational purposes only. © 2023 EPAM Systems, Inc.