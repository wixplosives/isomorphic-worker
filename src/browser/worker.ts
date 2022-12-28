import type { UniversalWorker } from '../types';

export const BrowserWorker = window.Worker as {
    new (url: string, options: WorkerOptions): UniversalWorker;
};
