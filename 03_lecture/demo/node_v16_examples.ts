// Generate v4 UUIDs without needing the uuid library
import * as crypto from 'crypto';

const itemId = crypto.randomUUID();

console.log(itemId);




// New promise-based APIs in Node.js
// import { setTimeout } from 'timers/promises';
import { setTimeout } from 'node:timers/promises';

(async () => {
  const delayedValue = await setTimeout(3000, '3 seconds later');

  console.log(delayedValue);
})();



// Cancel async operations with AbortController
import fetch from "node-fetch";

const cancelTimeout = new AbortController();
const cancelRequest = new AbortController();

async function timeout(milliseconds) {
  try {
    await setTimeout(milliseconds, undefined, { signal: cancelTimeout.signal });
    cancelRequest.abort();
  } catch (error) {
    // Ignore rejections
    console.log(error);
  }
}

async function makeRequest() {
  try {
    const response = await fetch('https://httpstat.us/200?sleep=5000', {
      signal: cancelRequest.signal,
    });
    console.log('Got response');
    return true;
  } catch (error) {
    if (error.name === 'AbortError') {
      console.error('Request was aborted');
    } else {
      console.error(error);
    }
  } finally {
    cancelTimeout.abort();
  }
}

(async () => {
  const result = await Promise.race([timeout(10000), makeRequest()]);
  console.log({ result });
})();





