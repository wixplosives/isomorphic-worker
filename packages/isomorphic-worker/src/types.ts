export type MessageType = 'message' | 'error';

export type WorkerScript = string | URL;

export interface WorkerOptions {
    name?: string;
    type?: 'classic' | 'module';
    /**
     * Worker data is only available in a node worker scope.
     * If possible, prefer passing data via the worker postMessage method.
     *
     * If you must use workerData by importing workerData from 'worker_threads',
     * you have to polyfill 'worker_threads' in the browser.
     */
    workerData?: any; // TODO: check if this can be standardized by query params
}

export type UniversalWorkerOptions = WorkerOptions | undefined;

export interface UniversalWorkerConstructor {
    new (url: WorkerScript, options: WorkerOptions): UniversalWorker;
}
export interface UniversalWorker {
    postMessage: (message: unknown) => void;
    addEventListener: (type: MessageType, callback: (message: UniversalMessage) => void) => void;
    removeEventListener: (type: MessageType, callback: (message: UniversalMessage) => void) => void;
    terminate: () => void;
}

export interface UniversalWorkerUserMethods {
    postMessage: (message: unknown) => void;
    addEventListener: (type: MessageType, callback: (message: any) => void) => void;
    removeEventListener: (type: MessageType, callback: (message: UniversalMessage) => void) => void;
}

export interface UniversalMessage<T = unknown> {
    data?: T;
    error?: Error;
}

export type UniversalMessageHandler = (message: UniversalMessage<unknown>) => void;
export type WorkerMessageHandler = (message: any) => void;
