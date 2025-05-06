# ITPU - IT Professional Upskilling

This repository contains educational materials, examples, and exercises for IT Professional Upskilling courses. The content is organized by weeks, with each week focusing on different aspects of IT infrastructure, system administration, and database management.

## Repository Structure

```
.
├── week09/                     # Database Management Systems
│   ├── docker-compose.yaml     # Docker services configuration
│   ├── .env.example            # Environment variables template
│   ├── Makefile                # Common commands
│   ├── db/                     # Database initialization scripts
│   ├── docs/                   # Documentation for CRUD operations
│   ├── scripts/                # Backup and restore scripts
│   ├── monitoring/             # Prometheus and Grafana configuration
│   └── README.md               # Week 9 specific documentation
│
├── week10/                     # System Administration
│   ├── log_collection/         # Log collection tools and examples
│   ├── mail_system/            # Mail system configuration
│   ├── printing/               # Printing system setup
│   ├── syslog/                 # Syslog configuration
│   ├── system_time/            # System time management
│   ├── systemd_journal/        # Systemd journal usage
│   ├── time_synchronization/   # NTP and time sync configuration
│   └── timedatectl_and_timesyncd/ # Timedate control utilities
│
├── week11/                     # Linux Command Reference & Practice
│   ├── README.md               # Linux command guide (ldd, ldconfig, ps, kill, nice, jobs)
│
├── week12/                     # Linux Command Line Essentials
│   ├── README.md               # Enhanced Linux command-line examples (cat, grep, sed, awk, find, ...)
│
├── week13/                     # Linux Security Hands-On Practice
│   ├── Linux-Security-Ubuntu.md # Security hands-on guide for Ubuntu 24.04
│   ├── Linux-Security-RH.md     # Security hands-on guide for Alma Linux / RHEL
│   └── README.md                # Landing page for Linux security guides
│
├── week14/                     # WordPress Stack with Docker Compose
│   ├── docker-compose.yml      # Docker services configuration
│   ├── nginx.conf             # Nginx reverse proxy configuration
│   ├── .env                   # Environment variables
│   ├── almalinux_setup.md     # AlmaLinux installation guide
│   └── ubuntu_setup.md        # Ubuntu 24.04 installation guide
│
└── ...
```

## Week 09: Multi-Database School Management System

Week 9 focuses on database management systems, demonstrating a school management system using both PostgreSQL and MongoDB databases running in Docker containers. It includes:

- Docker Compose setup for PostgreSQL and MongoDB
- Database initialization scripts
- CRUD operation examples
- Backup and restore procedures
- Monitoring with Prometheus and Grafana

### Key Features

- Multi-database architecture
- Database health monitoring
- Data backup and restoration
- Performance metrics visualization

For detailed instructions, see the [Week 9 README](/week09/README.md).

## Week 10: System Administration

Week 10 covers various aspects of Linux system administration, including:

### System Time Management
- Setting and displaying system time
- Hardware clock management
- Time synchronization with NTP and Chrony

### Logging and Monitoring
- Syslog configuration
- Systemd journal usage
- Log collection and analysis

### System Services
- Mail system configuration
- Printing system setup
- Time synchronization services

Each topic includes practical examples, commands, and configuration guidelines for Linux systems.

## Week 11: Linux Command Reference & Practice

Week 11 provides a comprehensive guide and hands-on reference for essential Linux commands related to process and library management. The covered commands include:

- `ldd`: Display shared library dependencies of executables
- `ldconfig`: Configure dynamic linker run-time bindings
- `ps`: Show information about running processes
- `kill`: Send signals to processes (e.g., terminate)
- `nice`: Run programs with modified scheduling priority
- `jobs`: Manage background and foreground jobs in the shell

The [Week 11 README](/week11/README.md) contains:
- Detailed explanations of each command
- Usage examples and options
- Troubleshooting tips
- Advanced scenarios (combining commands for system management)

This week is ideal for anyone looking to strengthen their Linux command-line skills for system administration or troubleshooting.

## Week 12: Linux Command Line Essentials

Week 12 expands your practical Linux command-line skills with a focus on both basic and advanced usage of essential tools. The [Week 12 README](/week12/README.md) features:

- Enhanced and creative examples for:
  - `cat`, `grep`, `sed`, `awk`, `find`, `ls`, `mkdir`, `touch`, `rm`, `rmdir`, `cp`, `mv`, `chmod`, `chown`
- Real-world scenarios and best practices
- Tips for combining commands and scripting
- Encouragement for experimentation and command-line mastery

This section is perfect for students who want to move beyond the basics and become power users of the Linux shell.

## Week 13: Linux Security Hands-On Practice

Week 13 provides practical, hands-on security exercises for two major Linux families:

- **[Linux-Security-Ubuntu.md](./week13/Linux-Security-Ubuntu.md)**: Step-by-step security tasks for Ubuntu 24.04 (Debian-based systems)
- **[Linux-Security-RH.md](./week13/Linux-Security-RH.md)**: Step-by-step security tasks for Alma Linux / RHEL (Red Hat-based systems)

Each guide covers:
- User and group management
- File permissions
- Docker installation and usage
- Firewall configuration
- Security auditing
- System hardening (with actionable, hands-on steps)

Refer to the landing page in `week13/README.md` for more details and to select the appropriate guide for your environment.

## Week 14: WordPress Stack with Docker Compose

Week 14 demonstrates setting up a modern WordPress stack using Docker Compose, featuring:

- Nginx reverse proxy configuration
- WordPress with PHP-FPM
- MySQL database integration
- Redis caching layer
- Installation guides for both Ubuntu 24.04 and AlmaLinux

The setup includes:
- Complete Docker Compose configuration
- Nginx as a reverse proxy
- Environment variable management
- Performance optimization
- Security considerations

For detailed instructions and setup guides, see the [Week 14 README](/week14/README.md).

---

For questions, improvements, or additional scenarios, please contact the instructor or open an issue in your course repository.

## Getting Started

1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/itpu.git
   cd itpu
   ```

2. Navigate to the specific week you're interested in:
   ```bash
   cd week09  # For database management
   # OR
   cd week10  # For system administration
   # OR
   cd week11  # For Linux command reference
   # OR
   cd week12  # For Linux command line essentials
   # OR
   cd week13  # For Linux security hands-on practice
   # OR
   cd week14  # For WordPress stack with Docker Compose
   ```

3. Follow the instructions in the respective README.md files for each week.

## Prerequisites

- Docker and Docker Compose (for Week 9)
- Linux environment (for Week 10 and Week 11)
- Basic knowledge of command line operations

## Contributing

If you'd like to contribute to this repository, please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Last Updated

April 30, 2025
