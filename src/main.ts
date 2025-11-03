//repl.js actually refers to repl.ts
// we use .js because that's the compiled output file

import { startREPL } from "./repl.js";


function main(): void {
  startREPL();
}

main();