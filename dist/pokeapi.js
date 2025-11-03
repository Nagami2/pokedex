export class PokeAPI {
    static baseURL = "https://pokeapi.co/api/v2";
    constructor() { }
    // fetches either the first page or a specific page URL
    async fetchLocations(pageURL) {
        const url = pageURL || `${PokeAPI.baseURL}/location/`;
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Failed to fetch locations: ${res.status} ${res.statusText}`);
        }
        return await res.json();
    }
    // we can leave this as a stub for now, as it's not needed yet
    async fetchLocation(locationName) {
        //implement later
    }
}
