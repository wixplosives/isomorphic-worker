import { Worker } from '@dazl/isomorphic-worker/worker';
import { worker } from '@dazl/isomorphic-worker/worker-scope';
import { log } from '../../log.js';

const workerName = 'second-level';
const thirdWorker = new Worker('./nested-worker-with-id.js?id=third-level');

worker.addEventListener('error', (e) => log(e));
worker.addEventListener('message', (message) => {
    log(`"${workerName}" got message from creator: ${message.data as string}`);
    thirdWorker.postMessage('Hello from second-level nested worker');
});

thirdWorker.addEventListener('message', (message) => {
    const data = message.data;
    log(`"${workerName}" got message: "${data as string}"`);
    worker.postMessage(data);
});

log(`"${workerName}" finished evaluating`);
