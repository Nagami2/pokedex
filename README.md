# pokedex
a REPL (Read-Eval-Print Loop)

Here is the general development plan I would follow to build this application:

Environment Setup (Today's Lesson): Get Node.js (with the right version), TypeScript, and the testing tool (bootdev) running. This is the foundation.

Build the REPL: Write the main "loop" of the program. This will be an async function that uses a library to read input from the command line, over and over, until the user types exit.

Command Parser: Write a function that takes the user's input (a string) and splits it into commands and arguments. For example, "inspect pikachu" becomes command: "inspect" and argument: "pikachu".

API Client: Create a new set of functions (e.g., getPokemon(name)) that are responsible for all fetch calls. This will be similar to what you did in the last course.

Caching Logic: This is the new, fun part. Before your API client makes a fetch call, it will first check: "Do I already have this data in my cache (a simple object)?"

If yes: Return the cached data instantly.

If no: Make the fetch call, save the result to the cache, and then return the data.

Display/Printing: Write simple functions that take the JSON data and console.log() it in a nice format.