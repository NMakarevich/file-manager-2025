import { createReadStream, createWriteStream } from "node:fs";
import * as path from "node:path";
import { mkdir as makeDir, rename, rm as remove } from "node:fs/promises";
import { currentDirectory } from "./navigation.js";
import { ERRORS } from "../constants.js";
import { generatePath } from "./path.js";
import { invalidInput } from "./invalidInput.js";

export async function cat(pathToFile) {
  try {
    if (!pathToFile) invalidInput();
    const rs = createReadStream(generatePath(pathToFile));
    let data = "";
    rs.on("data", (chunk) => (data += chunk.toString()));
    rs.on("end", () => console.log(data));
  } catch (error) {
    if (error.message === ERRORS.INVALID_INPUT_CODE) console.log(ERRORS.INVALID_INPUT);
    else console.error(ERRORS.OPERATION_FAILED);
  }
}

export async function add(fileName) {
  try {
    if (!fileName) invalidInput();
    const ws = createWriteStream(path.join(currentDirectory, fileName));
    ws.write("");
  } catch (error) {
    if (error.message === ERRORS.INVALID_INPUT_CODE) console.log(ERRORS.INVALID_INPUT);
    else console.error(ERRORS.OPERATION_FAILED);
  }
}

export async function mkdir(dirName) {
  try {
    if (!dirName) invalidInput();
    await makeDir(path.join(currentDirectory, dirName));
  } catch (error) {
    if (error.message === ERRORS.INVALID_INPUT_CODE) console.log(ERRORS.INVALID_INPUT);
    else console.error(ERRORS.OPERATION_FAILED);
  }
}

export async function rn(pathToFile, newFileName) {
  try {
    if (!pathToFile || !newFileName) invalidInput();
    const source = generatePath(pathToFile);
    const fileDir = path.parse(source).dir;
    await rename(source, path.join(fileDir, newFileName));
  } catch (error) {
    if (error.message === ERRORS.INVALID_INPUT_CODE) console.log(ERRORS.INVALID_INPUT);
    else console.error(ERRORS.OPERATION_FAILED);
  }
}

export async function cp(pathToFile, destinationDirectory) {
  try {
    if (!pathToFile || !destinationDirectory) invalidInput();
    const source = generatePath(pathToFile);
    const rs = createReadStream(source);
    const fileName = path.parse(source).base;
    const dest = path.join(generatePath(destinationDirectory), fileName);
    const ws = createWriteStream(dest);

    rs.pipe(ws);
  } catch (error) {
    if (error.message === ERRORS.INVALID_INPUT_CODE) console.log(ERRORS.INVALID_INPUT);
    else console.error(ERRORS.OPERATION_FAILED);
  }
}

export async function mv(pathToFile, destinationDirectory) {
  try {
    if (!pathToFile || !destinationDirectory) invalidInput();
    await cp(pathToFile, destinationDirectory).then(async () => await rm(pathToFile));
  } catch (error) {
    if (error.message === ERRORS.INVALID_INPUT_CODE) console.log(ERRORS.INVALID_INPUT);
    else console.error(ERRORS.OPERATION_FAILED);
  }
}

export async function rm(pathToFile) {
  try {
    if (!pathToFile) invalidInput();
    await remove(generatePath(pathToFile));
  } catch (error) {
    if (error.message === ERRORS.INVALID_INPUT_CODE) console.log(ERRORS.INVALID_INPUT);
    else console.error(ERRORS.OPERATION_FAILED);
  }
}
