import type {
    MessageType,
    UniversalMessage,
    UniversalMessageHandler,
    UniversalWorkerUserMethods,
    WorkerMessageHandler,
} from './types.js';

const getMessageData = (message: unknown): unknown => {
    if (message instanceof MessageEvent) {
        return message.data;
    }
    return message;
};

class UniversalWorkerUser implements UniversalWorkerUserMethods {
    private messageHandlersMap = new Map<UniversalMessageHandler, WorkerMessageHandler>();

    constructor(private self: Worker) {}

    public postMessage(message: unknown) {
        // transferables are here to support the browser polyfill
        this.self.postMessage(getMessageData(message), (message as { transferables: [] })['transferables']);
    }

    public addEventListener(type: 'message' | 'error', callback: (message: UniversalMessage) => void) {
        const handler: WorkerMessageHandler = (e) =>
            callback({ data: 'data' in e ? e.data : undefined, error: 'error' in e ? e.error : undefined });
        this.messageHandlersMap.set(callback, handler);

        this.self.addEventListener(type, handler);
    }

    public removeEventListener(type: MessageType, callback: (message: UniversalMessage) => void) {
        const handler = this.messageHandlersMap.get(callback);
        if (handler) {
            this.self.removeEventListener(type, handler);
        }

        this.messageHandlersMap.delete(callback);
    }
}

export const worker = new UniversalWorkerUser(self as unknown as Worker);
