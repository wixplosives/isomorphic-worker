import { worker } from '@wixc3/isomorphic-worker/worker-scope';

worker.addEventListener('message', (event) => {
    worker.postMessage({
        originalMessage: event.data,
        workerMessage: 'Hello from the worker!',
        workerData: worker.workerData,
    });
});
