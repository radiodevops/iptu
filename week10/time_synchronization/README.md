# Time Synchronization

This document covers tools for synchronizing system time with network sources.

## ntpd

• Start ntpd daemon (typically configured via service manager):
  `sudo systemctl start ntpd`

• Run once and exit (quick adjustment):
  `sudo ntpd -q`

• Speed up initial synchronization:
  Add the `iburst` option in the configuration.

## chrony

Chrony is a modern alternative for time synchronization.

• Start chronyd daemon:
  `sudo systemctl start chronyd`

• Check status and sources:
  `chronyc tracking`
  `chronyc sources`

• For additional configuration and measuring performance, see the chrony documentation.
