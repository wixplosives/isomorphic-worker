import type { UniversalWorkerUserMethods, UniversalMessage } from './types';

class UniversalWorkerUser implements UniversalWorkerUserMethods {
    constructor(private self: Worker) {}

    public postMessage(message: unknown) {
        this.self.postMessage(message);
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
