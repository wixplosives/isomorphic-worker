export type MessageType = 'message' | 'error';

export interface UniversalWorker {
    postMessage: (message: unknown) => void;
    addEventListener: (type: MessageType, callback: (message: UniversalMessage) => void) => void;
    terminate: () => void;
}

export interface UniversalWorkerUserMethods {
    postMessage: (message: unknown) => void;
    addEventListener: (type: MessageType, callback: (message: any) => void) => void;
}

export interface UniversalMessage {
    type: string;
    data: unknown;
}
