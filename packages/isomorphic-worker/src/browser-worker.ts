import './browser-polyfill/main-worker-host';
import './browser-polyfill/nested-worker-polyfill';
import type { UniversalWorkerConstructor } from './types';

// globalThis in case of initial worker script inside a worker
export const Worker = globalThis.Worker as UniversalWorkerConstructor;
