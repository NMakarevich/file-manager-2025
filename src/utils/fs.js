import { createReadStream, createWriteStream } from "node:fs";
import * as path from "node:path";
import { mkdir as makeDir, rename, rm as remove } from "node:fs/promises";
import { currentDirectory } from "./navigation.js";
import { ERRORS } from "../constants.js";
import { generatePath } from "./path.js";

export async function cat(pathToFile) {
  try {
    const rs = createReadStream(generatePath(pathToFile));
    let data = "";
    rs.on("data", (chunk) => (data += chunk.toString()));
    rs.on("end", () => console.log(data));
  } catch {
    console.error(ERRORS.OPERATION_FAILED);
  }
}

export async function add(fileName) {
  try {
    const ws = createWriteStream(path.join(currentDirectory, fileName));
    ws.write("");
  } catch {
    console.error(ERRORS.OPERATION_FAILED);
  }
}

export async function mkdir(dirName) {
  try {
    await makeDir(path.join(currentDirectory, dirName));
  } catch {
    console.error(ERRORS.OPERATION_FAILED);
  }
}

export async function rn(pathToFile, newFileName) {
  try {
    const source = generatePath(pathToFile);
    const fileDir = path.parse(source).dir;
    await rename(source, path.join(fileDir, newFileName));
  } catch {
    console.error(ERRORS.OPERATION_FAILED);
  }
}

export async function cp(pathToFile, destinationDirectory) {
  try {
    const source = generatePath(pathToFile);
    const rs = createReadStream(source);
    const fileName = path.parse(source).base;
    const dest = path.join(generatePath(destinationDirectory), fileName);
    const ws = createWriteStream(dest);

    rs.pipe(ws);
  } catch {
    console.error(ERRORS.OPERATION_FAILED);
  }
}

export async function mv(pathToFile, destinationDirectory) {
  try {
    await cp(pathToFile, destinationDirectory).then(async () => await rm(pathToFile));
  } catch {
    console.error(ERRORS.OPERATION_FAILED);
  }
}

export async function rm(pathToFile) {
  try {
    await remove(generatePath(pathToFile));
  } catch {
    console.error(ERRORS.OPERATION_FAILED);
  }
}
