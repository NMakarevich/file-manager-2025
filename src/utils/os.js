import * as OS from "node:os";
import { ERRORS } from "../constants.js";
import { invalidInput } from "./invalidInput.js";

export function os(arg) {
  try {
    if (!arg) invalidInput();
    switch (arg.slice(2)) {
      case "cpus": {
        const cpus = OS.cpus();
        console.log(`Amount of CPUs: ${cpus.length}`);
        console.table(
          cpus.map(({ model, speed }) => ({
            Model: model,
            "Clock Rate": `${(speed / 1000).toFixed(2)}GHz`,
          }))
        );
        break;
      }
      case "architecture": {
        console.log(OS.arch());
        break;
      }
      case "EOL": {
        console.log(JSON.stringify(OS.EOL));
        break;
      }
      case "homedir": {
        console.log(OS.homedir());
        break;
      }
      case "username": {
        console.log(OS.userInfo().username);
        break;
      }
      default: {
        console.error(ERRORS.INVALID_INPUT);
        break;
      }
    }
  } catch (error) {
    if (error.message === ERRORS.INVALID_INPUT_CODE) console.log(ERRORS.INVALID_INPUT);
    else console.error(ERRORS.OPERATION_FAILED);
  }
}
