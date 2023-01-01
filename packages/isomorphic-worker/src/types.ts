export type MessageType = 'message' | 'error';

export type WorkerScript = string | URL;

export interface UniversalWorkerOptions {
    type?: 'classic' | 'module';
}

export interface UniversalWorker {
    postMessage: (message: unknown) => void;
    addEventListener: (type: MessageType, callback: (message: UniversalMessage) => void) => void;
    terminate: () => void;
}

export interface UniversalWorkerUserMethods {
    postMessage: (message: unknown) => void;
    addEventListener: (type: MessageType, callback: (message: any) => void) => void;
}

export interface UniversalMessage<T = unknown> {
    data?: T;
    error?: Error;
}
