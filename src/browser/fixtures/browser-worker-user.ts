import { worker } from '../../browser/worker-user.js';
debugger;
console.log('browser-worker-user.ts');
worker.addEventListener('message', (event) => {
    console.log(`Received message on worker: ${event}`);
    worker.postMessage('Hello from the worker!');
});
