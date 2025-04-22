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

Explore, combine, and experiment with these commands to become a command-line power user!