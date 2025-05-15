# Linux Networking Hands-On Exercises

This document provides practical, hands-on exercises to help you understand Linux networking concepts. Each exercise builds on the knowledge presented in the course materials.

## Prerequisites

- A Linux system (physical or virtual machine)
- Root/sudo access
- Basic understanding of Linux command line

## Exercise 1: Exploring Network Interfaces

### Objective
Learn how to view and understand your network interfaces.

### Steps

1. Open a terminal and run the following commands to see your network interfaces:

   ```bash
   # Using modern tools
   ip addr show
   
   # Using older tools (may not be available on all systems)
   ifconfig
   ```

2. Identify your primary network interface (usually named eth0, ens33, or enp0s3).

3. Examine the output and note the following information for your main interface:
   - Interface name
   - MAC address
   - IP address and subnet mask
   - Current state (UP or DOWN)

4. Check your network connections using NetworkManager:

   ```bash
   nmcli connection show
   ```

5. Get detailed information about your active connection:

   ```bash
   nmcli device show <your_interface_name>
   ```

## Exercise 2: Testing Network Connectivity

### Objective
Learn to use basic network diagnostic tools.

### Steps

1. Test basic connectivity to a known website:

   ```bash
   ping -c 4 google.com
   ```

2. Trace the route packets take to reach a destination:

   ```bash
   traceroute google.com
   ```
   
   If traceroute isn't available, you might need to install it:
   ```bash
   sudo apt install traceroute   # For Debian/Ubuntu
   sudo dnf install traceroute   # For RHEL/Fedora
   ```

3. Check which ports are open and listening on your system:

   ```bash
   ss -tuln
   ```

4. Perform a DNS lookup:

   ```bash
   nslookup google.com
   # or
   dig google.com
   ```

5. Record your observations. What was the round-trip time in ping? How many hops did traceroute show?

## Exercise 3: Configuring Static and Dynamic IP Addresses

### Objective
Practice configuring network interfaces with both static and dynamic IP addresses.

### Steps

#### Using NetworkManager (Modern Method)

1. First, view your current connection:

   ```bash
   nmcli connection show
   ```

2. Set up a DHCP connection (dynamic IP):

   ```bash
   sudo nmcli connection modify "Your Connection Name" ipv4.method auto
   sudo nmcli connection up "Your Connection Name"
   ```

3. Set up a static IP connection:

   ```bash
   sudo nmcli connection modify "Your Connection Name" \
     ipv4.method manual \
     ipv4.addresses "192.168.1.100/24" \
     ipv4.gateway "192.168.1.1" \
     ipv4.dns "8.8.8.8,8.8.4.4"
   
   sudo nmcli connection up "Your Connection Name"
   ```

4. Verify your changes:

   ```bash
   ip addr show
   ```

#### Using Netplan (Ubuntu-based Systems)

1. Examine the current Netplan configuration:

   ```bash
   ls -l /etc/netplan/
   cat /etc/netplan/*.yaml
   ```

2. Create a backup of your existing configuration:

   ```bash
   sudo cp /etc/netplan/*.yaml /etc/netplan/backup.yaml
   ```

3. Create a new configuration file for DHCP:

   ```bash
   sudo nano /etc/netplan/01-dhcp-config.yaml
   ```

4. Add the following YAML for DHCP configuration:

   ```yaml
   network:
     version: 2
     renderer: networkd
     ethernets:
       your_interface_name:
         dhcp4: true
   ```

5. Apply the configuration:

   ```bash
   sudo netplan apply
   ```

6. Now modify for static IP:

   ```bash
   sudo nano /etc/netplan/01-static-config.yaml
   ```

7. Add the following YAML for static IP configuration:

   ```yaml
   network:
     version: 2
     renderer: networkd
     ethernets:
       your_interface_name:
         dhcp4: false
         addresses: [192.168.1.100/24]
         gateway4: 192.168.1.1
         nameservers:
           addresses: [8.8.8.8, 8.8.4.4]
   ```

8. Apply the configuration:

   ```bash
   sudo netplan apply
   ```

> Note: Replace "your_interface_name" with your actual interface name (e.g., ens33, eth0).

## Exercise 4: Working with DNS Configuration

### Objective
Learn how to configure DNS settings on Linux.

### Steps

1. Examine your current DNS configuration:

   ```bash
   cat /etc/resolv.conf
   ```

2. Check which nameservers NetworkManager is using:

   ```bash
   nmcli device show | grep DNS
   ```

3. Add custom DNS servers using NetworkManager:

   ```bash
   sudo nmcli connection modify "Your Connection Name" ipv4.dns "1.1.1.1,8.8.8.8"
   sudo nmcli connection up "Your Connection Name"
   ```

4. Verify local host resolution by examining the hosts file:

   ```bash
   cat /etc/hosts
   ```

5. Add a custom local host entry:

   ```bash
   sudo sh -c "echo '192.168.1.10 testserver.local' >> /etc/hosts"
   ```

6. Test your new local hosts entry:

   ```bash
   ping -c 2 testserver.local
   ```

## Exercise 5: Exploring ARP and Network Discovery

### Objective
Understand how ARP works and how to use it for network discovery.

### Steps

1. View your current ARP cache:

   ```bash
   ip neigh show
   # or
   arp -a
   ```

2. Ping a device on your local network to add it to your ARP cache:

   ```bash
   ping -c 1 192.168.1.1  # Use your router's IP
   ```

3. Check if the device was added to your ARP cache:

   ```bash
   ip neigh show
   ```

4. Clear your ARP cache (requires root):

   ```bash
   sudo ip neigh flush all
   ```

5. Scan your local network to discover devices (first install if needed):

   ```bash
   sudo apt install nmap   # Debian/Ubuntu
   # or
   sudo dnf install nmap   # RHEL/Fedora
   
   sudo nmap -sn 192.168.1.0/24  # Replace with your subnet
   ```

## Exercise 6: Basic Firewall Configuration

### Objective
Learn how to use the uncomplicated firewall (ufw) to manage basic firewall rules.

### Steps

1. Check if ufw is installed and install it if needed:

   ```bash
   which ufw || sudo apt install ufw   # For Debian/Ubuntu
   # or
   which ufw || sudo dnf install ufw   # For RHEL/Fedora
   ```

2. Check the current status of ufw:

   ```bash
   sudo ufw status
   ```

3. Enable and configure basic rules:

   ```bash
   # Allow SSH connections
   sudo ufw allow ssh
   
   # Allow HTTP and HTTPS
   sudo ufw allow http
   sudo ufw allow https
   
   # Allow specific port
   sudo ufw allow 8080/tcp
   ```

4. Enable the firewall:

   ```bash
   sudo ufw enable
   ```

5. Check your rules:

   ```bash
   sudo ufw status numbered
   ```

6. Delete a rule by number:

   ```bash
   sudo ufw delete 2  # Replace 2 with the rule number you want to delete
   ```

7. Disable the firewall when done with the exercise:

   ```bash
   sudo ufw disable
   ```

## Exercise 7: Network Monitoring Tools

### Objective
Learn to use basic network monitoring tools to analyze network traffic.

### Steps

1. Install necessary tools:

   ```bash
   sudo apt install iftop nethogs iperf3  # Debian/Ubuntu
   # or
   sudo dnf install iftop nethogs iperf3  # RHEL/Fedora
   ```

2. Monitor bandwidth usage with iftop (requires root):

   ```bash
   sudo iftop
   ```
   
   Press q to quit when done.

3. Monitor per-process network usage with nethogs:

   ```bash
   sudo nethogs
   ```
   
   Press q to quit when done.

4. Test network throughput using iperf3:

   First, on a server or another computer on your network, run:
   ```bash
   iperf3 -s
   ```

   Then on your system, run:
   ```bash
   iperf3 -c server_ip_address
   ```

5. Capture and analyze packets with tcpdump:

   ```bash
   # Capture packets on your main interface
   sudo tcpdump -i your_interface_name -n
   
   # Capture packets for a specific host
   sudo tcpdump -i your_interface_name host 8.8.8.8
   ```

   Press Ctrl+C to stop capture.

## Exercise 8: Network Settings in systemd-networkd

### Objective
Understand how to configure networking using systemd-networkd.

### Steps

1. Check if systemd-networkd is running:

   ```bash
   systemctl status systemd-networkd
   ```

2. Create a basic network configuration file:

   ```bash
   sudo mkdir -p /etc/systemd/network
   sudo nano /etc/systemd/network/20-wired.network
   ```

3. Add the following configuration for DHCP:

   ```
   [Match]
   Name=your_interface_name
   
   [Network]
   DHCP=yes
   ```

4. Or add the following configuration for static IP:

   ```
   [Match]
   Name=your_interface_name
   
   [Network]
   Address=192.168.1.100/24
   Gateway=192.168.1.1
   DNS=8.8.8.8
   DNS=8.8.4.4
   ```

5. Restart systemd-networkd to apply changes:

   ```bash
   sudo systemctl restart systemd-networkd
   ```

6. Check the status of your network:

   ```bash
   networkctl status your_interface_name
   ```

## Exercise 9: Setting Up a Simple Router

### Objective
Configure a Linux machine to act as a router between two network segments.

### Steps

1. Enable IP forwarding:

   ```bash
   # Temporarily enable
   sudo sysctl -w net.ipv4.ip_forward=1
   
   # Permanently enable
   sudo sh -c "echo 'net.ipv4.ip_forward=1' >> /etc/sysctl.conf"
   sudo sysctl -p
   ```

2. Set up NAT using iptables:

   ```bash
   # Assuming eth0 is your WAN interface and eth1 is your LAN interface
   sudo iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
   sudo iptables -A FORWARD -i eth1 -o eth0 -j ACCEPT
   sudo iptables -A FORWARD -i eth0 -o eth1 -m state --state RELATED,ESTABLISHED -j ACCEPT
   ```

3. Make the iptables rules persistent (on Debian/Ubuntu):

   ```bash
   sudo apt install iptables-persistent
   sudo netfilter-persistent save
   ```

4. Verify the routing settings:

   ```bash
   sudo iptables -L -v -n
   sudo iptables -t nat -L -v -n
   ```

## Exercise 10: Working with Network Namespaces

### Objective
Learn to use Linux network namespaces to create isolated network environments.

### Steps

1. Create two network namespaces:

   ```bash
   sudo ip netns add ns1
   sudo ip netns add ns2
   ```

2. List the created namespaces:

   ```bash
   ip netns list
   ```

3. Create a virtual Ethernet (veth) pair:

   ```bash
   sudo ip link add veth0 type veth peer name veth1
   ```

4. Move each veth endpoint to its namespace:

   ```bash
   sudo ip link set veth0 netns ns1
   sudo ip link set veth1 netns ns2
   ```

5. Configure IP addresses in each namespace:

   ```bash
   sudo ip netns exec ns1 ip addr add 10.0.0.1/24 dev veth0
   sudo ip netns exec ns2 ip addr add 10.0.0.2/24 dev veth1
   ```

6. Bring up the interfaces:

   ```bash
   sudo ip netns exec ns1 ip link set dev veth0 up
   sudo ip netns exec ns1 ip link set dev lo up
   sudo ip netns exec ns2 ip link set dev veth1 up
   sudo ip netns exec ns2 ip link set dev lo up
   ```

7. Test connectivity between namespaces:

   ```bash
   sudo ip netns exec ns1 ping -c 3 10.0.0.2
   sudo ip netns exec ns2 ping -c 3 10.0.0.1
   ```

8. Run a command in a specific namespace:

   ```bash
   sudo ip netns exec ns1 ip addr show
   ```

9. Clean up when done:

   ```bash
   sudo ip netns del ns1
   sudo ip netns del ns2
   ```

## Conclusion

These exercises cover the fundamentals of Linux networking, from basic interface configuration to more advanced topics like routing and network namespaces. By completing them, you'll gain practical experience with the tools and concepts discussed in the course material.

Remember that networking settings can vary between distributions and versions, so always consult the documentation specific to your system when working in a production environment.