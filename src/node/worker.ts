import { Worker, WorkerOptions } from 'worker_threads';
import type { MessageType, UniversalWorker } from '../types';

export class NodeWorker implements UniversalWorker {
    private worker: Worker;

    constructor(workerScript: string, options?: WorkerOptions) {
        this.worker = new Worker(workerScript, options);
    }

    public postMessage(message: any) {
        this.worker.postMessage(message);
    }

    public addEventListener(type: MessageType, callback: (message: any) => void) {
        this.worker.on(type, callback);
    }

    public terminate() {
        this.worker.terminate();
    }
}
