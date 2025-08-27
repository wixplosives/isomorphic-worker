import { worker } from '@dazl/isomorphic-worker/worker-scope';
import { log, logMessage } from '../log.js';

const workerId = new URLSearchParams(location.search).get('id');
if (!workerId) {
    throw new Error('workerId is missing');
}

// eslint-disable-next-line no-console
worker.addEventListener('error', (e) => console.log(e));
worker.addEventListener('message', (e) => {
    logMessage(workerId, e.data);
    worker.postMessage(`Hello from nested worker with id: ${workerId}`);
});
log(`worker "${workerId}" finished evaluating`);
