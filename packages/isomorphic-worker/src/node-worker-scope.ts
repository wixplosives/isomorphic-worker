import { parentPort, type MessagePort } from 'worker_threads';
import type { UniversalWorkerUserMethods } from './types';

const port = (function getPort() {
    if (!parentPort) {
        throw new Error('parentPort required for worker processors');
    }
    return parentPort;
})();

class UniversalWorkerUser implements UniversalWorkerUserMethods {
    constructor(private portOrWorkerSelf: MessagePort) {}

    postMessage(message: unknown) {
        this.portOrWorkerSelf.postMessage(message);
    }

    addEventListener(type: 'message' | 'error', callback: (message: any) => void) {
        this.portOrWorkerSelf.on(type, function MessageFromNodeWorker(message) {
            callback({ data: message });
        });
    }
}

export const worker = new UniversalWorkerUser(port);
