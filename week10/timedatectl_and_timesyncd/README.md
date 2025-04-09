# timedatectl and systemd-timesyncd

This document explains how to use timedatectl and systemd-timesyncd for time management.

## timedatectl

• Check system time status, including local, universal (UTC), RTC, time zone, and sync state:
  `timedatectl status`

• Set time synchronization on/off:
  `sudo timedatectl set-ntp true`
  `sudo timedatectl set-ntp false`

## systemd-timesyncd

• Enable systemd-timesyncd (if not already enabled):
  `sudo systemctl enable systemd-timesyncd`
  `sudo systemctl start systemd-timesyncd`

• Check service status using timedatectl:
  `timedatectl`

• To check for synchronization details specific to systemd-timesyncd, use:
  `sudo journalctl -u systemd-timesyncd`
