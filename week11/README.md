# Linux Command Guide: `ldd`, `ldconfig`, `ps`, `kill`, `nice`, and `jobs`

This README provides comprehensive information on using essential Linux commands for library management and process control.

## Table of Contents
- [Library Management Commands](#library-management-commands)
  - [ldd](#ldd)
  - [ldconfig](#ldconfig)
- [Process Management Commands](#process-management-commands)
  - [ps](#ps)
  - [kill](#kill)
  - [nice](#nice)
  - [jobs](#jobs)

## Library Management Commands

### ldd

`ldd` (List Dynamic Dependencies) displays the shared libraries required by a program.

#### Basic Usage
```bash
ldd /path/to/program
```

#### Options
- `-v`: Verbose mode, displays all information
- `-d`: Report missing data objects
- `-r`: Report missing data objects and functions
- `-u`: Report unused direct dependencies
- `--version`: Display version information

#### Examples
```bash
# Show dependencies for the ls command
ldd /bin/ls

# Verbose output
ldd -v /usr/bin/python3

# Check for unused dependencies
ldd -u /usr/bin/firefox
```

#### Understanding Output
```
linux-vdso.so.1 (0x00007ffcb1d7c000)
libselinux.so.1 => /lib/x86_64-linux-gnu/libselinux.so.1 (0x00007f4bd3bcb000)
libc.so.6 => /lib/x86_64-linux-gnu/libc.so.6 (0x00007f4bd39e9000)
```

Each line shows:
- Library name
- Path to the actual library file
- Memory address where it's loaded

#### Troubleshooting
If you see "not found" for any library, you need to install the corresponding package or fix your library path.

### ldconfig

`ldconfig` configures dynamic linker run-time bindings, creating links and cache for the most recent shared libraries.

#### Basic Usage
```bash
sudo ldconfig
```

#### Options
- `-v`: Verbose mode, displays all libraries being added
- `-p`: Print the current cache without updating it
- `-n`: Process only the specified directory, don't update cache
- `-X`: Don't update symbolic links
- `-N`: Don't rebuild the cache

#### Configuration
Library paths are defined in:
- `/etc/ld.so.conf`
- Files in `/etc/ld.so.conf.d/`
- Environment variable `LD_LIBRARY_PATH`

#### Examples
```bash
# Update the cache
sudo ldconfig

# Display current cache
ldconfig -p

# Process only a specific directory
sudo ldconfig -n /usr/local/lib

# Verbose update
sudo ldconfig -v
```

#### Adding a New Library Path
1. Create a new .conf file in `/etc/ld.so.conf.d/`:
   ```bash
   echo "/path/to/libraries" | sudo tee /etc/ld.so.conf.d/mylibs.conf
   ```
2. Run ldconfig to update the cache:
   ```bash
   sudo ldconfig
   ```

## Process Management Commands

### ps

`ps` (Process Status) displays information about active processes.

#### Basic Usage
```bash
ps
```

#### Common Options
- `a`: Show processes of all users
- `u`: Display user-oriented format
- `x`: Include processes without controlling terminals
- `e` or `-e`: Show all processes
- `f`: Full format listing
- `-o`: Customize output format

#### Examples
```bash
# Show all processes (BSD style)
ps aux

# Show all processes (UNIX style)
ps -ef

# Show process tree
ps -ejH

# Show processes for a specific user
ps -u username

# Custom format (PID, user, command, CPU and memory usage)
ps -eo pid,user,cmd,%cpu,%mem --sort=-%cpu
```

#### Output Fields
- `PID`: Process ID
- `TTY`: Terminal type
- `TIME`: CPU time used
- `CMD`: Command name
- `%CPU`: CPU usage
- `%MEM`: Memory usage
- `STAT`: Process state (R=running, S=sleeping, Z=zombie, etc.)

### kill

`kill` sends signals to processes, commonly used to terminate them.

#### Basic Usage
```bash
kill [options] <PID>
```

#### Common Signals
- `1` (SIGHUP): Reload configuration
- `2` (SIGINT): Interrupt (same as Ctrl+C)
- `9` (SIGKILL): Force kill, cannot be caught or ignored
- `15` (SIGTERM): Graceful termination (default)
- `18` (SIGCONT): Continue if stopped
- `19` (SIGSTOP): Stop process

#### Examples
```bash
# Terminate process gracefully
kill 1234

# Force kill a process
kill -9 1234

# Kill by process name using pkill
pkill firefox

# Kill all processes of a user
pkill -u username

# List all available signals
kill -l
```

#### Sending Signals to Multiple Processes
```bash
# Kill all processes matching a pattern
pkill -f "pattern"

# Kill all processes of an application
killall application_name
```

### nice

`nice` runs a command with modified scheduling priority (niceness).

#### Basic Usage
```bash
nice [option] [command [arguments]]
```

#### Options
- `-n LEVEL`: Set the niceness level (from -20 to 19)
  - Lower values = higher priority (-20 is highest)
  - Higher values = lower priority (19 is lowest)
  - Default niceness for new processes is 0

#### Examples
```bash
# Run a command with lower priority
nice tar -czf backup.tar.gz /home/user

# Specify niceness level (higher number = lower priority)
nice -n 10 ./cpu_intensive_task

# Run with highest priority (requires root)
sudo nice -n -20 ./critical_process
```

#### Changing Priority of Running Processes
Use `renice` to change the priority of an existing process:

```bash
# Change priority of process with PID 1234
renice -n 5 -p 1234

# Change priority for all processes of a user
renice -n 5 -u username
```

### jobs

`jobs` displays the status of jobs in the current shell session.

#### Basic Usage
```bash
jobs [options]
```

#### Options
- `-l`: List process IDs in addition to job information
- `-p`: List only process IDs
- `-r`: Display only running jobs
- `-s`: Display only stopped jobs

#### Job Control Commands
- `bg [job_id]`: Continue a suspended job in the background
- `fg [job_id]`: Bring a background job to the foreground
- `Ctrl+Z`: Suspend the current foreground job
- `Ctrl+C`: Terminate the current foreground job
- `&` (at end of command): Run a command in the background

#### Examples
```bash
# Start a job in the background
sleep 100 &

# List all jobs
jobs

# List jobs with PIDs
jobs -l

# Bring job to foreground (% followed by job number)
fg %1

# Send job to background
bg %1

# Kill a specific job
kill %1
```

#### Job States
- `Running`: Currently executing
- `Stopped`: Suspended, usually by Ctrl+Z
- `Done`: Completed execution
- `Terminated`: Killed by a signal

## Combining Commands

These commands can be used together for effective system management:

```bash
# Find memory-hungry processes and adjust priority
ps aux --sort=-%mem | head -n 5
renice -n 10 -p $(pgrep -f memory-intensive-app)

# Check library dependencies of a process
ldd $(which $(ps -p 1234 -o comm=))

# Kill all processes using a specific library
for pid in $(lsof -t /path/to/library.so); do kill $pid; done

# Update library cache after installing new libraries
sudo cp mylib.so /usr/local/lib/
sudo ldconfig
```

## Additional Resources

- Man pages: `man ldd`, `man ldconfig`, `man ps`, `man kill`, `man nice`, `man jobs`
- GNU Coreutils documentation: https://www.gnu.org/software/coreutils/manual/
- Linux Process Management: https://tldp.org/LDP/tlk/kernel/processes.html
