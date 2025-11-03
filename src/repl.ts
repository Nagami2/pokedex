import type { State } from "./state.js";

// function to clean and parse user input
export function cleanInput(input: string): string[] {
  return input.toLowerCase().trim().split(/\s+/);
}

export function startREPL(state: State): void {
    // get components from state
    const rl = state.rl;
    const commands = state.commands;

    rl.prompt();

    rl.on("line", (line) => {
        const words = cleanInput(line);

        if(words.length === 0 || (words.length === 1 && words[0] === "")) {
            rl.prompt();
            return;
        }

        // handle the command
        const commandName = words[0];
        const command = commands[commandName];

        if (command) {
            try {
                command.callback(state);
            } catch (error) {
                console.error(`Error executing command "${commandName}":`, error);
            }   
        } else {
            console.log(`Unknown command: ${commandName}`);
        }   

        // don't prompt again if the command was 'exit'
        if (commandName !== "exit") {
            rl.prompt();
        }
    });
}