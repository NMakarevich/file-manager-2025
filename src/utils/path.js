import path from "node:path";
import { cwd } from "node:process";

export function generatePath(source) {
  return path.isAbsolute(source) ? source : path.join(cwd(), source);
}
