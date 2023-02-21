import type { UniversalWorkerUserMethods, UniversalMessage } from './types';

const getMessageData = (message: unknown): unknown => {
    if (message instanceof MessageEvent) {
        return message.data;
    }
    return message;
};

class UniversalWorkerUser implements UniversalWorkerUserMethods {
    constructor(private self: Worker) {}

    public postMessage(message: unknown) {
        // transferables are here to support the browser polyfill
        this.self.postMessage(getMessageData(message), (message as { transferables: [] })['transferables']);
    }

    public addEventListener(type: 'message' | 'error', callback: (message: UniversalMessage) => void) {
        this.self.addEventListener(type, (e) => {
            callback({
                data: 'data' in e ? e.data : undefined,
                error: 'error' in e ? e.error : undefined,
            });
        });
    }
}

export const worker = new UniversalWorkerUser(self as any);
