import type { UniversalWorker } from './types';

// globalThis in case of initial worker script inside a worker
export const Worker = globalThis.Worker as {
    new (url: string | URL, options: WorkerOptions): UniversalWorker;
};
