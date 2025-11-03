import { Cache } from "./pokecache.js"; // 1. import Cache

// these types are based on the JSON response from the API
export type ShallowLocations = {
    count: number;
    next: string | null;
    previous: string | null;
    results: {
        name: string;
        url: string;
    }[];
};

export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";

    // 2. create a cache instance
    private cache = new Cache(5 * 60 * 1000); // 5 minutes

    constructor() {}

    // fetches either the first page or a specific page URL
    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
        const url = pageURL || `${PokeAPI.baseURL}/location/`;

        // 3. check cache first!
        const cachedData = this.cache.get<ShallowLocations>(url);
        if (cachedData) {
            // console.log("Cache hit for", url); // optional: log cache hits
            return cachedData;
        }
        // console.log("Cache miss for", url); // optional: log cache misses

        // 4. fetch from API if not in cache
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Failed to fetch locations: ${res.status} ${res.statusText}`);
        }
        const data = await res.json();

        // 5. add the new data to the cache
        this.cache.add(url, data);
        return data;
    }

    // we can leave this as a stub for now, as it's not needed yet
    async fetchLocation(locationName: string): Promise<any> {
        //implement later
    }
    

}
