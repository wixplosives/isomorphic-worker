import './browser-polyfill/main-worker-host.js';
import './browser-polyfill/nested-worker-polyfill.js';
import type { UniversalWorkerConstructor } from './types.js';

// globalThis in case of initial worker script inside a worker
export const Worker = globalThis.Worker as UniversalWorkerConstructor;
