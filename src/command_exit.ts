import type { State } from "./state";

export function commandExit(state: State): void {
  console.log("Closing the Pokedex.... Goodbye!");
  state.rl.close(); // cleanup the readline interface
  process.exit(0);
}