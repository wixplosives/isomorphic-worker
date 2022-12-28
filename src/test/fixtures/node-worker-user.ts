import { worker } from '../../node/worker-user';

worker.addEventListener('message', (event) => {
    console.log(`Received message on worker: ${event}`);
    worker.postMessage('Hello from the worker!');
});
