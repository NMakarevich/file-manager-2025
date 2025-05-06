export function getUserName() {
  const args = process.argv;
  const usernameArg = args.find((arg) => arg.startsWith("--username"));

  return !usernameArg || !usernameArg.split("=")[1] ? "Unknown User" : usernameArg.split("=")[1];
}
