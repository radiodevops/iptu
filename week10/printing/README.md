# Printing with CUPS

This document explains how to manage printing in Linux using the Common UNIX Printing System (CUPS).

## Useful Commands

• Check printer status and list queues:
  `lpstat -a`
  `lpq`

• Send a file to the printer:
  `lp filename.txt`

• Remove a print job from the queue:
  `lprm job_number`

## CUPS Administration

• Access the CUPS web interface by opening a browser and navigating to:
  `http://localhost:631`

• Restart the CUPS service if something isn’t working:
  `sudo systemctl restart cups`

## Practice Tasks

• Install CUPS if it is not installed:
  `sudo apt-get install cups`
  or
  `sudo yum install cups`
• Experiment with adding a printer using the web interface
• Print a test page from the command line
