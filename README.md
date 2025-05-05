# File Manager

## How to run app

```bash
npm run start -- --username=%USER_NAME%
```
If username doesn't provide to args, app start with `Unknown User`;

## Command list

> [!IMPORTANT] 
> To provide path or filename which contains spaces you should wrap this path to double quotes!
> For example: `"/path with spaces"`

### 1. Navigation

* `up` - move for one level up (to parent directory). Doesn't move if user in `root` directory.
* `cd pathToDirectory` - move to entered path
* `ls` - print list of directories and files in current directory

### 2. File System

* `cat pathToFile` - read file content
* `add fileName` - create new file with `fileName` in current directory
* `mkdir dirName` - create new directory with `dirName` in current directory
* `rn pathToFile newFileName` - rename file in `pathToFile` with `newFileName`
* `cp pathToFile pathToDirectory` - copy file in `pathToFile` to directory with `pathToDirectory`
* `mv pathToFile pathToDirectory` - move file from `pathToFile` to directory with `pathToDirectory`
* `rm pathToFile` - delete file with `pathToFile`

### 3. OS

* `os --EOL` - get end of line (EOL) for current OS
* `os --cpus` - print amount of CPUs and information about each CPU (name and frequency in GHz)
* `os --homedir` - print home directory for current user
* `os --username` - print current system username
* `os --architecture` - print CPU architecture

### 4. Hash

* `hash pathToFile` - calculate hash (SHA256) for `pathToFile`

### 5. Zip

* `compress pathToFile pathToDirectory` - compress file with `pathToFile` with Brotli algorithm and save archive to `pathToDirectory`. Archive name contains full file name with extension and `.br`. For example: `compress file.txt ./` will create file.txt.br in current directory.
* `decompress pathToArchive pathToDirectory` - decompress archive with `pathToArchive` to directory `pathToDirectory`