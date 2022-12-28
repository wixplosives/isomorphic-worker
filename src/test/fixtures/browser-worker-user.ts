import { worker } from '../../browser/worker-user.js';

worker.addEventListener('message', (event) => {
    console.log(`Received message on worker: ${event}`);
    worker.postMessage('Hello from the worker!');
});
