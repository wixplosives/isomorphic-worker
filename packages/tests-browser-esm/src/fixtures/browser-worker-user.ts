import { worker } from '@dazl/isomorphic-worker/worker-scope';

worker.addEventListener('message', (_event) => {
    worker.postMessage('Hello from the worker!');
});
