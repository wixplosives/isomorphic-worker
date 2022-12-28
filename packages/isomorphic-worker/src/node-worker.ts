import { Worker, WorkerOptions } from 'worker_threads';
import type { MessageType, UniversalMessage, UniversalWorker } from './types';

class NodeWorker implements UniversalWorker {
    private worker: Worker;

    constructor(workerScript: string | URL, options?: WorkerOptions) {
        this.worker = new Worker(workerScript, options);
    }

    public postMessage(message: any) {
        this.worker.postMessage(message);
    }

    public addEventListener(type: MessageType, callback: (message: UniversalMessage) => void) {
        this.worker.on(type, (message) => callback({ data: message }));
    }

    public terminate() {
        this.worker.terminate();
    }
}

export { NodeWorker as Worker };
