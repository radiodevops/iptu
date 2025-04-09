# Systemd Journal

Learn how to use systemd journaling for logging and troubleshooting.

## journalctl: Viewing and Querying Logs

• Show all journal entries:
  `journalctl`

• View journal entries from the current boot:
  `journalctl -b`

• List previous boot sessions:
  `sudo journalctl --list-boots`

• Follow real-time entries:
  `sudo journalctl -f`

• View logs from a specific service (e.g., dbus.service):
  `sudo journalctl -u dbus.service`

• Filter logs by time:
  `sudo journalctl --since="2023-10-05 00:00:00" --until="2023-10-05 12:00:00"`

• Get additional explanation for log messages:
  `journalctl -x`

## journald Configuration

• Main config file: `/etc/systemd/journald.conf`
  Tune settings like Storage, Compress, and retention limits.

## Practice Tasks

• Experiment with filtering logs by time and service.
• Edit `/etc/systemd/journald.conf` (use caution) and restart journald:
  `sudo systemctl restart systemd-journald`
