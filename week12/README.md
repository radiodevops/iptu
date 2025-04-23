Certainly! Here’s a sample `README.md` for your repository, covering **basic** and **advanced** usage of the listed commands. This is designed to be clear and instructive for students.

---

# Linux Command Line Essentials

This repository demonstrates the usage of essential Linux command-line tools. Below you'll find **basic** and **advanced** examples for each command, including practical and creative scenarios to help you master them.

---

## Table of Contents

- [cat](#cat)
- [grep](#grep)
- [sed](#sed)
- [awk](#awk)
- [find](#find)
- [ls](#ls)
- [mkdir](#mkdir)
- [touch](#touch)
- [rm](#rm)
- [rmdir](#rmdir)
- [cp](#cp)
- [mv](#mv)
- [chmod](#chmod)
- [chown](#chown)
- [fork() System Call (Advanced Linux)](#fork-system-call-advanced-linux)
- [Compiling and Running C Code on Ubuntu 24.04](#compiling-and-running-c-code-on-ubuntu-2404)

---

## cat

Concatenate and display files.

**Basic:**
```sh
cat -n file.txt
```
Display `file.txt` with line numbers.

**Advanced:**
```sh
cat *.log | grep "ERROR" | tee errors.txt
```
Concatenate all `.log` files, filter lines containing "ERROR", and save them to `errors.txt` while also displaying them.

---

## grep

Search for patterns in files.

**Basic:**
```sh
grep -i "error" *.log
```
Search for "error" (case-insensitive) in all `.log` files.

**Advanced:**
```sh
ps aux | grep -E "nginx|apache"
```
Find running processes related to either nginx or apache using extended regex.

---

## sed

Stream editor for filtering and transforming text.

**Basic:**
```sh
sed 's/foo/bar/g' file.txt
```
Replace all occurrences of "foo" with "bar" in `file.txt`.

**Advanced:**
```sh
sed -n '/^ERROR/,/^$/p' logfile.txt
```
Print all blocks in `logfile.txt` that start with "ERROR" and end with a blank line (useful for extracting error reports).

---

## awk

Pattern scanning and processing language.

**Basic:**
```sh
awk '{print $2, $3}' data.txt
```
Print the 2nd and 3rd columns from `data.txt`.

**Advanced:**
```sh
awk '$3 > 100 {print $1, $3}' sales.csv
```
Print the first and third columns for rows where the third column (e.g., sales amount) is greater than 100.

---

## find

Search for files and directories.

**Basic:**
```sh
find . -type f -name "*.sh"
```
Find all shell script files in the current directory and subdirectories.

**Advanced:**
```sh
find /var/log -type f -mtime -1 -exec gzip {} \;
```
Find all files in `/var/log` modified in the last day and compress them.

---

## ls

List directory contents.

**Basic:**
```sh
ls -lh
```
List files with human-readable sizes.

**Advanced:**
```sh
ls -lt --group-directories-first
```
List files sorted by modification time, showing directories first.

---

## mkdir

Create directories.

**Basic:**
```sh
mkdir -p new_folder/sub_folder
```
Create a directory and its parent directories as needed.

**Advanced:**
```sh
for i in {1..5}; do mkdir "project_$i"; done
```
Create multiple directories named `project_1` to `project_5` in a loop.

---

## touch

Create empty files or update file timestamps.

**Basic:**
```sh
touch -t 202504220900 file.txt
```
Create a file or update its timestamp to April 22, 2025, 09:00.

**Advanced:**
```sh
touch {a..z}.txt
```
Quickly create 26 files named `a.txt` to `z.txt`.

---

## rm

Remove files or directories.

**Basic:**
```sh
rm -i file.txt
```
Remove a file with confirmation prompt.

**Advanced:**
```sh
find . -type f -name "*.tmp" -delete
```
Find and delete all `.tmp` files in the current directory tree.

---

## rmdir

Remove empty directories.

**Basic:**
```sh
rmdir empty_folder
```
Remove an empty directory.

**Advanced:**
```sh
find . -type d -empty -delete
```
Find and delete all empty directories under the current directory.

---

## cp

Copy files and directories.

**Basic:**
```sh
cp -u source.txt backup/
```
Copy `source.txt` to `backup/` only if it's newer than the destination file.

**Advanced:**
```sh
cp -r --parents src/folder1/folder2 target/
```
Recursively copy a directory, preserving the parent structure.

---

## mv

Move (rename) files.

**Basic:**
```sh
mv oldname.txt newname.txt
```
Rename a file.

**Advanced:**
```sh
find . -name "*.bak" -exec mv {} {}.old \;
```
Find all `.bak` files and append `.old` to their names.

---

## chmod

Change file permissions.

**Basic:**
```sh
chmod +x script.sh
```
Make a script executable.

**Advanced:**
```sh
find . -type f -name "*.sh" -exec chmod 755 {} \;
```
Make all shell scripts in the directory tree executable by everyone, writable by owner.

---

## chown

Change file owner and group.

**Basic:**
```sh
sudo chown user:group file.txt
```
Change owner and group of a file.

**Advanced:**
```sh
sudo chown -R $USER:$USER /var/www/html
```
Recursively change ownership of all files and directories under `/var/www/html` to the current user.

---

## fork() System Call (Advanced Linux)

The `fork()` system call is fundamental in Unix/Linux for creating new processes. It duplicates the calling process, allowing for parallel execution and is widely used in systems programming.

**Basic Example (C):**
```c
#include <stdio.h>
#include <unistd.h>

int main() {
    pid_t pid = fork();
    if (pid == 0) {
        // Child process
        printf("Hello from child!\n");
    } else if (pid > 0) {
        // Parent process
        printf("Hello from parent!\n");
    } else {
        perror("fork");
    }
    return 0;
}
```
This program prints messages from both parent and child processes.

**Advanced Example 1: Parallel Child Processes**
```c
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/wait.h>

int main() {
    for (int i = 0; i < 3; i++) {
        pid_t pid = fork();
        if (pid == 0) {
            printf("Child %d (PID: %d)\n", i, getpid());
            exit(0);
        }
    }
    // Parent waits for all children
    for (int i = 0; i < 3; i++) {
        wait(NULL);
    }
    printf("Parent done.\n");
    return 0;
}
```
This code spawns three child processes and the parent waits for them to finish.

**Advanced Example 2: Fork and Execute a Shell Command**
```c
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/wait.h>

int main() {
    char *cmd[] = {"ls", "-l", NULL};
    pid_t pid = fork();
    if (pid == 0) {
        execvp(cmd[0], cmd); // Child runs 'ls -l'
        perror("execvp failed");
        exit(1);
    } else if (pid > 0) {
        wait(NULL); // Parent waits
        printf("Listing complete.\n");
    }
    return 0;
}
```
This program forks a child to run `ls -l` and the parent waits for it to finish.

**Advanced Example 3: Fork Bomb (Do NOT Run!)**
```sh
:(){ :|:& };:
```
This infamous shell fork bomb will quickly exhaust system resources by recursively spawning processes. **Never run this on a real system!**

---

## Compiling and Running C Code on Ubuntu 24.04

If you're new to C programming, here’s how you can compile and run the provided C code examples on Ubuntu 24.04.

### 1. Install Required Packages

You need the GNU Compiler Collection (GCC). The recommended package is `build-essential`, which includes `gcc` and other necessary development tools.

```sh
sudo apt update
sudo apt install build-essential
```

### 2. Compiling a C Program

Save your C code to a file, for example `fork_example.c`.

To compile:
```sh
gcc fork_example.c -o fork_example
```
- `gcc` is the GNU C Compiler.
- `fork_example.c` is your source file.
- `-o fork_example` names the output executable `fork_example`.

### 3. Running the Program

After compiling, run your program with:
```sh
./fork_example
```

### 4. Quick Reference
- Write your code in a file ending with `.c` (e.g., `myprog.c`).
- Compile with `gcc myprog.c -o myprog`
- Run with `./myprog`

---

Explore, combine, and experiment with these commands to become a command-line power user!