import { Worker } from '@wixc3/isomorphic-worker/worker';
import { worker } from '@wixc3/isomorphic-worker/worker-scope';
import { log, logMessage } from '../log';

const workerName = 'first-level-nested-worker';
const workers: Worker[] = [];
workers.push(new Worker('./nested-worker-with-id.js?id=a'));
workers.push(new Worker('./nested-worker-with-id.js?id=b'));

worker.addEventListener('error', (e) => log(e));
worker.addEventListener('message', (message) => {
    log(`"${workerName}" got message from creator: ${message.data}`);

    for (const nestedWorker of workers) {
        nestedWorker.postMessage('Hello from first-level nested worker');
    }
});

for (const nestedWorker of workers) {
    nestedWorker.addEventListener('message', (message) => {
        const data = message.data;
        logMessage(workerName, data);
        worker.postMessage(data);
    });
}

log(`"${workerName}" finished evaluating`);
