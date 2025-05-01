import { generatePath } from "./path.js";
import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import { ERRORS } from "../constants.js";
import { stdout } from "node:process";

export function hash(pathToFile) {
  try {
    const source = generatePath(pathToFile);
    const rs = createReadStream(source);
    const hash = createHash("sha256");
    rs.pipe(hash).setEncoding("hex").pipe(stdout);
  } catch {
    console.error(ERRORS.OPERATION_FAILED);
  }
}
