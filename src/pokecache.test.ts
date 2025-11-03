import { Cache } from "./pokecache.js";
import { test, expect } from "vitest";

test.concurrent.each([
    {
        key: "https://example.com",
        val: "testdata",
        interval: 500, // 0.5 seconds
    },
    {
        key: "https://another.com/path",
        val: "moredata",
        interval: 1000, // 1 second
    },
])("Test Caching $interval ms", async ({ key, val, interval }) => {
    // 1. create cache with a short interval
    const cache = new Cache(interval);

    // 2. add an item
    cache.add(key, val);

    // 3. check that it's in the cache
    const cachedItem = cache.get(key);
    expect(cachedItem).toBe(val);

    // 4. wait for the reap interval + a 100ms buffer
    await new Promise((resolve) => setTimeout(resolve, interval + 100));
    
    // 5. check that the item has been reaped (is now undefined)
    const reapedItem = cache.get(key);
    expect(reapedItem).toBe(undefined);

    // 6. clean up the test
    cache.stopReapLoop();
});
