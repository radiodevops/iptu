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

April 15, 2025
