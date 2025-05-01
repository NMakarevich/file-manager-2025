import { cd, ls, printCurrentDirectory, up } from "./navigation.js";
import { add, cat, cp, mkdir, mv, rm, rn } from "./fs.js";
import { os } from "./os.js";
import { hash } from "./hash.js";
import { compress, decompress } from "./zip.js";
import { ERRORS, EXIT_COMMAND } from "../constants.js";

export async function parseInput(input) {
  const [command, ...args] = input.includes('"')
    ? input
        .split('"')
        .map((item) => item.trim())
        .filter((item) => item)
    : input.split(" ");

  switch (command) {
    case EXIT_COMMAND: {
      process.exit();
      break;
    }
    case "up": {
      await up();
      break;
    }
    case "cd": {
      await cd(...args);
      break;
    }
    case "ls": {
      await ls();
      break;
    }
    case "cat": {
      await cat(...args);
      break;
    }
    case "add": {
      await add(...args);
      break;
    }
    case "mkdir": {
      await mkdir(...args);
      break;
    }
    case "rn": {
      await rn(...args);
      break;
    }
    case "cp": {
      await cp(...args);
      break;
    }
    case "mv": {
      await mv(...args);
      break;
    }
    case "rm": {
      await rm(...args);
      break;
    }
    case "os": {
      await os(...args);
      break;
    }
    case "hash": {
      await hash(...args);
      break;
    }
    case "compress": {
      await compress(...args);
      break;
    }
    case "decompress": {
      await decompress(...args);
      break;
    }
    default: {
      console.log(ERRORS.INVALID_INPUT);
      break;
    }
  }

  printCurrentDirectory();
}
