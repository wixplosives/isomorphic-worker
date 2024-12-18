import type { UniversalWorkerConstructor } from './types.js';

// globalThis in case of initial worker script inside a worker
export const Worker = globalThis.Worker as UniversalWorkerConstructor;
