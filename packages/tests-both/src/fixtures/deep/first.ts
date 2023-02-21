import { Worker } from '@wixc3/isomorphic-worker/worker';
import { worker } from '@wixc3/isomorphic-worker/worker-scope';
import { log, logMessage } from '../../log';

const workerName = 'first-level';
const secondWorker = new Worker('./second.js');

worker.addEventListener('error', (e) => log(e));
worker.addEventListener('message', (message) => {
    logMessage(workerName, message.data);
    secondWorker.postMessage('Hello from first-level nested worker');
});

secondWorker.addEventListener('message', ({ data }) => {
    logMessage(workerName, data);
    worker.postMessage(data);
});

log(`"${workerName}" finished evaluating`);
