import { Worker } from 'worker_threads';
import type { MessageType, UniversalMessage, UniversalWorker, UniversalWorkerOptions, WorkerScript } from './types';

class NodeWorker implements UniversalWorker {
    private worker: Worker;

    constructor(url: WorkerScript, options?: UniversalWorkerOptions) {
        this.worker = new Worker(url, options);
    }

    public postMessage(message: any) {
        this.worker.postMessage(message);
    }

    public addEventListener(type: MessageType, callback: (message: UniversalMessage) => void) {
        this.worker.on(type, (message) => callback({ data: message }));
    }

    public terminate() {
        return this.worker.terminate();
    }
}

export { NodeWorker as Worker };
