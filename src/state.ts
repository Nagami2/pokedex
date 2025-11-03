// this will be the "home" for types and for initializing the appliccation's state
import * as readline from "node:readline";
import {commandHelp} from "./command_help.js";
import {commandExit} from "./command_exit.js";


// 1. CLICommand type moved here and updated
export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State) => void; // callback now accepts State
};

// 2. Application state type
export type State = {
    rl: readline.Interface;
    commands: Record<string, CLICommand>;
};

// 3. Function to initialize the application state
export function initState(): State {
    // logic from repl.ts is moved here
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: 'Pokedex > ',
    });

    // command registry
    const commands: Record<string, CLICommand> = {
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

    return { rl, commands };
}

