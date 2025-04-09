# Log Collection Servers

This document introduces various tools and platforms for centralized log management.

## ELK Stack

• Elasticsearch:
  Start or check service: (this depends on your installation, e.g., `sudo systemctl status elasticsearch`)

• Logstash:
  Run Logstash with a configuration file:
  `sudo /usr/share/logstash/bin/logstash -f /path/to/your/config.conf`

• Kibana:
  Access at `http://localhost:5601` once started.

## syslog-ng

• Install syslog-ng (if not installed):
  `sudo apt-get install syslog-ng`
  or
  `sudo yum install syslog-ng`
• Start syslog-ng:
  `sudo systemctl start syslog-ng`

## Graylog Open

• Graylog requires a setup (MongoDB, Elasticsearch, Graylog server) – refer to the official documentation for installation.
  Typically start each service with systemctl.

## Fluentd

• Install Fluentd:
  `sudo gem install fluentd` (or use packages provided by your distro)
• Start Fluentd with a config file:
  `fluentd -c /path/to/your/fluent.conf`

## Practice Tasks

• Set up a basic ELK environment (even if on virtual machines or containers) to forward and visualize sample logs.
• Experiment with sending logs via syslog-ng and check its output.
