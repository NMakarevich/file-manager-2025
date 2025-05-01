import path from "node:path";
import { currentDirectory } from "./navigation.js";

export function generatePath(source) {
  return path.isAbsolute(source) ? source : path.join(currentDirectory, source);
}
