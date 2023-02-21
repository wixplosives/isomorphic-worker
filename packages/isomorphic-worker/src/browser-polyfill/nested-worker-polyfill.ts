import type { UniversalWorkerOptions, WorkerScript } from '../types';
import { CREATE_NESTED_WORKER } from './constants';

type MessageListener = (e: MessageEvent) => void;

class WorkerBridge {
    /**
     * Listeners registered by the creator of the worker
     */
    private messageListeners = new Set<MessageListener>();
    private errorListeners = new Set<MessageListener>();
    private channel = new MessageChannel();

    constructor(url: WorkerScript, options: UniversalWorkerOptions) {
        const messageToWorkerCreator = (e: MessageEvent) => {
            for (const listener of this.messageListeners) {
                listener(e);
            }
        };
        this.channel.port1.onmessage = messageToWorkerCreator;

        const transferables: Transferable[] = [this.channel.port2];

        // always sent to main thread
        self.postMessage(
            {
                type: CREATE_NESTED_WORKER,
                constructorArgs: [url, options],
                transferables,
            },
            /**
             * signature: postMessage(message: any, transfer?: Transferable[]): void;
             * https://developer.mozilla.org/en-US/docs/Web/API/DedicatedWorkerGlobalScope/postMessage
             */
            transferables as any
        );
    }
    /**
     * Send messages FROM the creator of the worker TO the nested worker
     * @param message any serializable object
     */
    postMessage(message: unknown) {
        this.channel.port1.postMessage(message);
    }

    /**
     * add listen from the worker creator ON the nested worker
     */
    addEventListener(type: 'message' | 'error', listener: MessageListener) {
        if (type === 'message') {
            this.messageListeners.add(listener);
        } else if (type === 'error') {
            this.errorListeners.add(listener);
        } else {
            throw new Error('not supported');
        }
    }
    removeEventListener(type: string, listener: MessageListener) {
        if (type === 'message') {
            this.messageListeners.delete(listener);
        } else {
            throw new Error('not supported');
        }
    }

    terminate() {
        this.channel.port1.close();
        this.channel.port2.close();
    }

    onmessage = null;
    onerror = null;
    onmessageerror = null;
    dispatchEvent() {
        throw new Error('not supported');
    }
}

if (!globalThis.Worker) {
    globalThis.Worker = WorkerBridge as any;
}
