import { worker } from '../../browser/worker-user';
debugger;
console.log('browser-worker-user.ts');
worker.addEventListener('message', (event) => {
    console.log(`Received message on worker: ${event}`);
    worker.postMessage('Hello from the worker!');
});
