import type { UniversalWorkerOptions, WorkerScript } from '../types';
import { CREATE_NESTED_WORKER } from './constants';
import { isSafari } from './is-safari';

const isMainThreadInSafari = isSafari && !!globalThis.Worker;

(function () {
    if (!isMainThreadInSafari) {
        return;
    }

    const openWorkers = new Map();

    class WorkerBridgeMain extends (globalThis.Worker || {}) {
        constructor(url: WorkerScript, options: UniversalWorkerOptions) {
            super(url, options);
            this.hookEnvironment();
        }

        private hookEnvironment() {
            this.addEventListener('message', (e) => {
                const params = e.data;
                if (params?.type === CREATE_NESTED_WORKER) {
                    const port = e.ports[0];
                    /**
                     * e.ports[0] === e.data.port // true
                     */
                    if (!port) {
                        throw new Error('no port');
                    }

                    if (openWorkers.has(port)) {
                        throw new Error('port already in use');
                    }
                    const args = params.constructorArgs;
                    const worker = new Worker(args[0], args[1]);
                    openWorkers.set(port, worker);
                    connectToWorker(worker, port);
                }
            });
        }
    }

    function connectToWorker(worker: Worker, port: MessagePort) {
        worker.addEventListener('message', (e) => {
            port.postMessage(e.data, e.ports.length ? ([e.ports[0]] as any) : undefined);
        });

        port.addEventListener('message', (e) => {
            worker.postMessage(e.data);
        });

        port.addEventListener('close', () => {
            worker.terminate();
            openWorkers.delete(port);
        });
        port.start();
    }

    globalThis.Worker = WorkerBridgeMain;
})();
