# Mail System

This guide covers key components of email systems, including mail user agents (MUAs), mail transfer agents (MTAs), and more.

## Mail User Agent (MUA)

• Popular MUAs include Thunderbird, Evolution, and command-line clients like Mutt.
• Practice: Install Thunderbird and configure an email account (if possible in a lab).

## Mail Transfer Agent (MTA)

• A classic example is Sendmail, though Postfix is widely used.
• To check Postfix status:
  `sudo systemctl status postfix`

• To start/stop Postfix:
  `sudo systemctl start postfix`
  `sudo systemctl stop postfix`

## Mail Submission Agent (MSA)

• Postfix can also handle mail submission.
• Configure the MSA in Postfix’s main configuration file (`/etc/postfix/main.cf`).
• Check for message submission logs via:
  `sudo journalctl -u postfix`

## Mail Delivery Agent (MDA)

• MDAs deliver mail to users’ inboxes. For local delivery, programs like procmail are often used.
• Practice editing a simple procmail configuration file to filter incoming mail.

## Practice Tasks

• Simulate sending an email using the command-line:
  `sendmail recipient@example.com`
  Then, type your message followed by a single “.” on a line.
• Use log-checking commands to verify mail processing steps.
