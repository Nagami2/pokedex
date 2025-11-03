type CacheEntry<T> = {
    createdAt: number;
    val: T;
};

export class Cache {
    // Map of URL string to a cache entry
    #cache = new Map<string, CacheEntry<any>>();
    #reapIntervalId: NodeJS.Timeout | undefined = undefined;
    #interval: number; // the max age of a cache entry in milliseconds
    
    constructor(interval: number = 5 * 60 * 1000) {
        this.#interval = interval;
        this.#startReapLoop();
    }

    // adds a new entry to the cache
    add<T>(key: string, val: T): void {
        const entry: CacheEntry<T> = {
            createdAt: Date.now(),
            val: val,
        };
        this.#cache.set(key, entry);
    }

    // gets an entry from the cache
    get<T>(key: string): T | undefined {
        const entry = this.#cache.get(key);
        if (!entry) {
            return undefined;
        }
        // return the value
        return entry.val as T;
    }

    // the private method that cleans up old entries
    #reap(): void{
        const now = Date.now();
        for (const [key, entry] of this.#cache.entries()) {
            //check if entry is older than the interval
            if (entry.createdAt < now - this.#interval) {
                this.#cache.delete(key);
            }
        }
    }

    // starts the reap loop
    #startReapLoop(): void {
        // run the reap function every interval milliseconds
        this.#reapIntervalId = setInterval(() => {
            this.#reap();
        }, this.#interval);
    }

    // public method to stop the loop (useful for tests)
    stopReapLoop(): void {
        if (this.#reapIntervalId) {
            clearInterval(this.#reapIntervalId);
            this.#reapIntervalId = undefined;
        }
    }
}