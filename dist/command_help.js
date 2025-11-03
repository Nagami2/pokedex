export function commandHelp(commands) {
    console.log("Available commands:");
    // Iterate over the commands and print their name and description
    for (const command of Object.values(commands)) {
        console.log(`  ${command.name}: ${command.description}`);
    }
    console.log(""); // Add an extra newline for better readability
}
