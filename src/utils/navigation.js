import * as os from "node:os";
import * as path from "node:path";
import { access, readdir } from "node:fs/promises";
import { ERRORS } from "../constants.js";
import { invalidInput } from "./invalidInput.js";
import { cwd, chdir } from "node:process";

chdir(os.homedir());

export function printCurrentDirectory(rl) {
  console.log(`You are currently in ${cwd()}`);
  rl.prompt();
}

export async function up() {
  chdir("..");
}

export async function cd(newPath) {
  try {
    if (!newPath) invalidInput();
    if (path.isAbsolute(newPath)) {
      await access(path.parse(newPath).dir);
      chdir(newPath);
    } else {
      await access(path.join(cwd(), newPath));
      chdir(path.join(cwd(), newPath));
    }
  } catch (error) {
    if (error.message === ERRORS.INVALID_INPUT_CODE) console.log(ERRORS.INVALID_INPUT);
    else console.error(ERRORS.OPERATION_FAILED);
  }
}

export async function ls() {
  try {
    const dirents = await readdir(cwd(), { withFileTypes: true });
    const directories = dirents
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => ({ Name: dirent.name, Type: "directory" }))
      .sort(sortByName);
    const files = dirents
      .filter((dirent) => dirent.isFile())
      .map((dirent) => ({ Name: dirent.name, Type: "file" }))
      .sort(sortByName);
    console.table([...directories, ...files]);
  } catch (error) {
    console.log(error);
    console.log(ERRORS.OPERATION_FAILED);
  }
}

function sortByName(a, b) {
  return a.Name > b.Name ? 1 : a.Name < b.Name ? -1 : 0;
}
