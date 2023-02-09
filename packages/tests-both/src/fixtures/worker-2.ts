import { worker } from '@wixc3/isomorphic-worker/worker-scope';

// eslint-disable-next-line no-console
const log = console.log.bind(console, 'worker2 | ');

// eslint-disable-next-line no-console
worker.addEventListener('error', (e) => log(e));
worker.addEventListener('message', ({ data }: { data: unknown }) => {
    log(data);
    worker.postMessage('Hello from worker 2 (nested worker)');
});
log('second worker listener attached');
