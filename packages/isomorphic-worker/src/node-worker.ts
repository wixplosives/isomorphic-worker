import { Worker } from 'node:worker_threads';
import type {
    MessageType,
    UniversalMessageHandler,
    UniversalWorker,
    UniversalWorkerOptions,
    WorkerMessageHandler,
    WorkerScript,
} from './types.js';

class NodeWorker implements UniversalWorker {
    private worker: Worker;
    private messageHandlersMap = new Map<UniversalMessageHandler, WorkerMessageHandler>();

    constructor(url: WorkerScript, options?: UniversalWorkerOptions) {
        this.worker = new Worker(url, options);
    }

    public postMessage(message: unknown) {
        this.worker.postMessage(message);
    }

    public addEventListener(type: MessageType, callback: UniversalMessageHandler) {
        const handler: WorkerMessageHandler = (message) => callback({ data: message });
        this.messageHandlersMap.set(callback, handler);

        this.worker.on(type, handler);
    }

    removeEventListener(type: MessageType, callback: UniversalMessageHandler) {
        const handler = this.messageHandlersMap.get(callback);
        if (handler) {
            this.worker.off(type, handler);
        }
        this.messageHandlersMap.delete(callback);
    }

    public terminate() {
        return this.worker.terminate();
    }
}

export { NodeWorker as Worker };
