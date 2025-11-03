// function to clean and parse user input
export function cleanInput(input) {
    return input.toLowerCase().trim().split(/\s+/);
}
export function startREPL(state) {
    // get components from state
    const rl = state.rl;
    const commands = state.commands;
    rl.prompt();
    // make the event listener callback async
    rl.on("line", async (line) => {
        const words = cleanInput(line);
        if (words.length === 0 || (words.length === 1 && words[0] === "")) {
            rl.prompt();
            return;
        }
        // handle the command
        const commandName = words[0];
        const command = commands[commandName];
        if (command) {
            try {
                await command.callback(state);
            }
            catch (err) {
                console.error(`Error executing command "${commandName}":`, err);
                if (err instanceof Error) {
                    console.error("Error message:", err.message);
                }
            }
        }
        else {
            console.log(`Unknown command: ${commandName}`);
        }
        // don't prompt again if the command was 'exit'
        if (commandName !== "exit") {
            rl.prompt();
        }
    });
}
