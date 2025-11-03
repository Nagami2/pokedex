export async function commandExit(state) {
    console.log("Closing the Pokedex.... Goodbye!");
    state.rl.close(); // cleanup the readline interface
    process.exit(0);
}
