import { Worker } from '@dazl/isomorphic-worker/worker';
import { worker } from '@dazl/isomorphic-worker/worker-scope';
import { log } from '../log.js';

worker.addEventListener('error', (e) => log(e));
worker.addEventListener('message', (_e) => {
    const worker2 = new Worker('./worker-2.js');
    worker2.addEventListener('message', (event: unknown) => {
        log('worker 1 got event from worker 2:', event);
        worker.postMessage(event);
    });
    worker2.postMessage('Hello from worker 1');
});
log('worker 1 finished evaluating');
