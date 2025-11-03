import { startREPL } from "./repl.js";
import { initState } from "./state.js";
function main() {
    const state = initState(); // create the state
    startREPL(state); // pass it to the REPL
}
main();
