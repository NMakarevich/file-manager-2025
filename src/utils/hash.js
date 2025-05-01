import { generatePath } from "./path.js";
import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import { ERRORS } from "../constants.js";
import { stdout } from "node:process";
import { invalidInput } from "./invalidInput.js";

export function hash(pathToFile) {
  try {
    if (!pathToFile) invalidInput();
    const source = generatePath(pathToFile);
    const rs = createReadStream(source);
    const hash = createHash("sha256");
    rs.pipe(hash).setEncoding("hex").pipe(stdout);
  } catch (error) {
    if (error.message === ERRORS.INVALID_INPUT_CODE) console.log(ERRORS.INVALID_INPUT);
    else console.error(ERRORS.OPERATION_FAILED);
  }
}
