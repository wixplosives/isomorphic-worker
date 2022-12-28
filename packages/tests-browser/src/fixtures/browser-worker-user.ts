import { worker } from '@wixc3/isomorphic-worker/dist/browser-worker-scope.js';

console.log('worker starting');

worker.addEventListener('message', (event) => {
    console.log(`Received message on worker: ${event}`);
    worker.postMessage('Hello from the worker!');
});
