// this will be the "home" for types and for initializing the appliccation's state
import * as readline from "node:readline";
import {commandHelp} from "./command_help.js";
import {commandExit} from "./command_exit.js";
import { commandMap, commandMapB } from "./command_map.js";
import { PokeAPI } from "./pokeapi.js"; //import PokeAPI class


// 1. update the callback to return a promise
export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State) => Promise<void>; 
};

// 2. update the State type
export type State = {
    rl: readline.Interface;
    commands: Record<string, CLICommand>;
    pokeapi: PokeAPI; // add PokeAPI instance to state
    nextLocationsURL: string | null; // for pagination
    prevLocationsURL: string | null; // for pagination
};

// 3. update the initState function
export function initState(): State {
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
        map: {
            name: "map",
            description: "Displays the next 20 location areas",
            callback: commandMap,
        },
        mapb: {
            name: "mapb",
            description: "Displays the previous 20 location areas",
            callback: commandMapB,
        },  
    };

    return { 
        rl, 
        commands,
        pokeapi: new PokeAPI(), // instantiate PokeAPI
        nextLocationsURL: "https://pokeapi.co/api/v2/location-area", // initialize pagination URLs
        prevLocationsURL: null,
    };
}

