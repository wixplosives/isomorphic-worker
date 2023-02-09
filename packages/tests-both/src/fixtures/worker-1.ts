import { Worker } from '@wixc3/isomorphic-worker/worker';
import { worker } from '@wixc3/isomorphic-worker/worker-scope';

// eslint-disable-next-line no-console
const log = console.log.bind(console, 'worker1 | ');

worker.addEventListener('error', (e) => log(e));
worker.addEventListener('message', (_e) => {
    // eslint-disable-next-line no-console
    log('first worker listener attached');

    const worker2 = new Worker('./worker-2.js');
    worker2.addEventListener('message', ({ data }: any) => {
        log('data', data);
        worker.postMessage(data);
    });
    worker2.postMessage('Hello from worker 1');
});
