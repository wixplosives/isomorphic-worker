import { worker } from '@wixc3/isomorphic-worker/worker-scope';

console.log('worker starting');

worker.addEventListener('message', (event) => {
    console.log(`Received message on worker: ${event}`);
    worker.postMessage('Hello from the worker!');
});
