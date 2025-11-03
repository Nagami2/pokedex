// create this file to define the shape of a command

export type CLICommand = {
    name: string;
    description: string;
    // all callbacks will accept a dictionary of commands
    callback: (commands: Record<string, CLICommand>) => void;
};