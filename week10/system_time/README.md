# System Time

This document covers commands and concepts for maintaining system time on Linux.

## Useful Commands

• Check system time:
  `date`
  – Displays the current date and time.

• Set system time (as a normal user, if allowed or using sudo):
  `date -s "YYYY-MM-DD HH:MM:SS"`
  Example: `sudo date -s "2023-10-05 15:30:00"`

• Customize date format:
  `date +"%d-%m-%y"`
  – Displays day, month, and year.

• Epoch Time:
  `date +"%s"`
  – Returns the number of seconds since 1970-01-01.

## Homework

• Experiment with setting the date using different formats.
• Use the man page: `man date` to view more details.
