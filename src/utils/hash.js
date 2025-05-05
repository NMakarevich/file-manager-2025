import { generatePath } from "./path.js";
import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import { ERRORS } from "../constants.js";
import { invalidInput } from "./invalidInput.js";

export function hash(pathToFile) {
  try {
    if (!pathToFile) invalidInput();
    return new Promise((resolve) => {
      const source = generatePath(pathToFile);
      const rs = createReadStream(source);
      const hash = createHash("sha256");
      rs.on("data", (chunk) => {
        hash.update(chunk);
      });
      rs.on("end", () => {
        const hex = hash.digest("hex");
        console.log(hex);
        resolve(hex);
      });
      rs.on("error", () => {
        console.error(ERRORS.OPERATION_FAILED);
      });
    });
  } catch (error) {
    if (error.message === ERRORS.INVALID_INPUT_CODE) console.log(ERRORS.INVALID_INPUT);
    else console.error(ERRORS.OPERATION_FAILED);
  }
}
