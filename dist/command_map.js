export async function commandMap(state) {
    if (!state.nextLocationsURL) {
        console.log("You've reached the end of the locations.");
        return;
    }
    try {
        const locations = await state.pokeapi.fetchLocations(state.nextLocationsURL);
        //update state with new pagination URLs
        state.nextLocationsURL = locations.next;
        state.prevLocationsURL = locations.previous;
        // print the names
        for (const location of locations.results) {
            console.log(location.name);
        }
    }
    catch (err) {
        if (err instanceof Error) {
            console.error("Error fetching locations:", err.message);
        }
        else {
            console.error("Unknown error fetching locations");
        }
    }
}
export async function commandMapB(state) {
    if (!state.prevLocationsURL) {
        console.log("You're already at the beginning of the locations.");
        return;
    }
    try {
        const locations = await state.pokeapi.fetchLocations(state.prevLocationsURL);
        //update state with new pagination URLs
        state.nextLocationsURL = locations.next;
        state.prevLocationsURL = locations.previous;
        // print the names
        for (const location of locations.results) {
            console.log(location.name);
        }
    }
    catch (err) {
        if (err instanceof Error) {
            console.error("Error fetching locations:", err.message);
        }
        else {
            console.error("Unknown error fetching locations");
        }
    }
}
