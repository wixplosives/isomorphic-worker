import { worker } from '@wixc3/isomorphic-worker/worker-scope';
import { log } from '../log.js';

// eslint-disable-next-line no-console
worker.addEventListener('error', (e) => console.log(e));
worker.addEventListener('message', (e: unknown) => {
    log('worker 2 got event from creator:', e);

    worker.postMessage('Hello from worker 2 (nested worker)');
});
log('worker 2 finished evaluating');
