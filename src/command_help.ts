import type { CLICommand, State } from "./state.js";

export function commandHelp(state: State): void {
  console.log("Available commands:");
  
  // Iterate over the commands and print their name and description
  for (const command of Object.values(state.commands)) {
    console.log(`  ${command.name}: ${command.description}`);
  }
  console.log(""); 
}
