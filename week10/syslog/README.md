# Syslog

This document covers the basics of system logging using syslog and its common implementations.

## Syslog Commands and Configurations

• View syslog messages (file-based, depends on distro):
  `tail -f /var/log/syslog` (Ubuntu/Debian)
  `tail -f /var/log/messages` (CentOS/RedHat)

• Check the syslog service status:
  `sudo systemctl status rsyslog`
  or
  `sudo systemctl status syslog`

• Basic configuration files:
  Usually located in `/etc/rsyslog.conf` or `/etc/syslog.conf`.

## Practice Tasks

• Edit the syslog configuration to forward logs to a remote server.
• Use the “logger” command to send a test message:
  `logger "This is a test log message."`
