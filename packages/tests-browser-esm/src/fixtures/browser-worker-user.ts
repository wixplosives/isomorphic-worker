import { worker } from '@wixc3/isomorphic-worker/worker-scope';

worker.addEventListener('message', (_event) => {
    worker.postMessage('Hello from the worker!');
});
