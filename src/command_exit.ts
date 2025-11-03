import type { State } from "./state";

export async function commandExit(state: State): Promise<void> {
  console.log("Closing the Pokedex.... Goodbye!");
  state.rl.close(); // cleanup the readline interface
  process.exit(0);
}