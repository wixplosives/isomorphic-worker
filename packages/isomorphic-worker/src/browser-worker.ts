import type { UniversalWorker, WorkerScript } from './types';

// globalThis in case of initial worker script inside a worker
export const Worker = globalThis.Worker as {
    new (url: WorkerScript, options: WorkerOptions): UniversalWorker;
};
