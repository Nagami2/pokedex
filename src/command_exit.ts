import type { CLICommand } from "./command.js";


// it must accept a dictionary of commands to match the CLICommand type
// even though this function doesn't use it
export function commandExit(commands: Record<string, CLICommand>): void {
  console.log("Closing the Pokedex.... Goodbye!");
  process.exit(0);
}