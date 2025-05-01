import { createBrotliCompress, createBrotliDecompress } from "node:zlib";
import { createReadStream, createWriteStream } from "node:fs";
import { generatePath } from "./path.js";
import * as path from "node:path";
import { ERRORS } from "../constants.js";
import { pipeline } from "node:stream/promises";
import { invalidInput } from "./invalidInput.js";

export async function compress(pathToFile, pathToDestination) {
  try {
    if (!pathToFile || !pathToDestination) invalidInput();
    const source = generatePath(pathToFile);
    const filename = `${path.parse(source).base}.zip`;
    const dest = path.join(generatePath(pathToDestination), filename);
    const rs = createReadStream(source);
    const ws = createWriteStream(dest);
    await pipeline(rs, createBrotliCompress(), ws);
  } catch (error) {
    if (error.message === ERRORS.INVALID_INPUT_CODE) console.log(ERRORS.INVALID_INPUT);
    else console.error(ERRORS.OPERATION_FAILED);
  }
}

export async function decompress(pathToFile, pathToDestination) {
  try {
    if (!pathToFile || !pathToDestination) invalidInput();
    const source = generatePath(pathToFile);
    const filename = `${path.parse(source).name}`;
    const dest = path.join(generatePath(pathToDestination), filename);
    const rs = createReadStream(source);
    const ws = createWriteStream(dest);
    await pipeline(rs, createBrotliDecompress(), ws);
  } catch (error) {
    if (error.message === ERRORS.INVALID_INPUT_CODE) console.log(ERRORS.INVALID_INPUT);
    else console.error(ERRORS.OPERATION_FAILED);
  }
}
