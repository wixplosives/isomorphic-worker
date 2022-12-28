import type { UniversalWorkerUserMethods } from '../types';

class UniversalWorkerUser implements UniversalWorkerUserMethods {
    constructor(private self: MessagePort) {}

    public postMessage(message: unknown) {
        this.self.postMessage(message);
    }

    public addEventListener(type: 'message' | 'error', callback: (message: any) => void) {
        this.self.addEventListener(type, callback);
    }
}

export const worker = new UniversalWorkerUser(self as any);
