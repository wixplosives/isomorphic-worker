import { Worker } from '@wixc3/isomorphic-worker/worker';
import { worker } from '@wixc3/isomorphic-worker/worker-scope';
import { log } from '../../log';

const workerName = 'second-level';
const thirdWorker = new Worker('./nested-worker-with-id.js?id=third-level');

worker.addEventListener('error', (e) => log(e));
worker.addEventListener('message', (message) => {
    log(`"${workerName}" got message from creator: ${message.data}`);
    thirdWorker.postMessage('Hello from second-level nested worker');
});

thirdWorker.addEventListener('message', (message) => {
    const data = message.data;
    log(`"${workerName}" got message: "${data}"`);
    worker.postMessage(data);
});

log(`"${workerName}" finished evaluating`);
