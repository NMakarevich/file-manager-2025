import { stdin, stdout } from "node:process";
import { createInterface } from "node:readline";

import { greeting } from "./utils/greeting.js";
import { EXIT_COMMAND } from "./constants.js";
import { parseInput } from "./utils/parseInput.js";
import { printCurrentDirectory } from "./utils/navigation.js";
import { getUserName } from "./utils/getUserName.js";

async function fileManager() {
  const user = getUserName();
  greeting(user);
  const EXIT_MESSAGE = `Thank you for using File Manager, ${user}, goodbye!`;

  printCurrentDirectory();

  const rl = createInterface({ input: stdin, output: stdout });

  rl.on("line", (line) => {
    if (line.toString().trim() === EXIT_COMMAND) {
      process.exit();
    }
    parseInput(line);
  });

  process.on("exit", () => {
    console.log(EXIT_MESSAGE);
  });

  process.on("SIGINT", () => {
    console.log(EXIT_MESSAGE);
  });
}

await fileManager();
