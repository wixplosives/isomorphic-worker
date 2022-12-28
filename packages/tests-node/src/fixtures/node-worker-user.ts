import { worker } from '@wixc3/isomorphic-worker/worker-scope';

worker.addEventListener('message', (event) => {
    console.log(`Received message on worker: ${event}`);
    worker.postMessage('Hello from the worker!');
});
