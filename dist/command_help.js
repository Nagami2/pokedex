export function commandHelp(state) {
    console.log("Available commands:");
    // Iterate over the commands and print their name and description
    for (const command of Object.values(state.commands)) {
        console.log(`  ${command.name}: ${command.description}`);
    }
    console.log("");
}
