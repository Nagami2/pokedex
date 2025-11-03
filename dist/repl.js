import * as readline from "node:readline";
import { commandHelp } from "./command_help.js";
import { commandExit } from "./command_exit.js";
// function to clean and parse user input
export function cleanInput(input) {
    return input
        .toLowerCase()
        .trim()
        .split(/\s+/); // split on one or more whitespace characters
}
//command registry function
function getCommands() {
    return {
        help: {
            name: "help",
            description: "List all available commands",
            callback: commandHelp,
        },
        exit: {
            name: "exit",
            description: "Exit the Pokedex application",
            callback: commandExit,
        },
    };
}
export function startREPL() {
    // 1. create the interface
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: 'Pokedex > ',
    });
    // get the command registry
    const commands = getCommands();
    // 2. show the first prompt
    rl.prompt();
    // 3. listen for "line" events (when the user hits Enter)
    rl.on("line", (line) => {
        // 4. use your cleanInput function
        const words = cleanInput(line);
        // 5. check if input was empty
        if (words.length === 0 || (words.length === 1 && words[0] === "")) {
            rl.prompt();
            return;
        }
        // 6. handle the command
        const commandName = words[0];
        const command = commands[commandName];
        if (command) {
            try {
                command.callback(commands);
            }
            catch (error) {
                console.error(`Error executing command "${commandName}":`, error);
            }
        }
        else {
            console.log(`Unknown command: ${commandName}`);
        }
        // 7. show the prompt again
        rl.prompt();
    });
}
