import { parentPort, workerData, type MessagePort } from 'node:worker_threads';
import type {
    MessageType,
    UniversalMessage,
    UniversalMessageHandler,
    UniversalWorkerUserMethods,
    WorkerMessageHandler,
} from './types.js';

const port = (function getPort() {
    if (!parentPort) {
        throw new Error('parentPort required for worker processors');
    }
    return parentPort;
})();

class UniversalWorkerUser implements UniversalWorkerUserMethods {
    private messageHandlersMap = new Map<UniversalMessageHandler, WorkerMessageHandler>();
    public workerData = workerData;
    constructor(private portOrWorkerSelf: MessagePort) {}

    postMessage(message: unknown) {
        this.portOrWorkerSelf.postMessage(message);
    }

    addEventListener(type: 'message' | 'error', callback: (message: any) => void) {
        const handler = (message: any) => callback({ data: message });
        this.messageHandlersMap.set(callback, handler);

        this.portOrWorkerSelf.on(type, function MessageFromNodeWorker(message) {
            callback({ data: message });
        });
    }

    public removeEventListener(type: MessageType, callback: (message: UniversalMessage<unknown>) => void) {
        const handler = this.messageHandlersMap.get(callback);
        if (handler) {
            this.portOrWorkerSelf.off(type, handler);
        }

        this.messageHandlersMap.delete(callback);
    }
}

export const worker = new UniversalWorkerUser(port);
