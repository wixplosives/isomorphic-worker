import type { UniversalWorker } from './types';

export const Worker = window.Worker as {
    new (url: string | URL, options: WorkerOptions): UniversalWorker;
};
