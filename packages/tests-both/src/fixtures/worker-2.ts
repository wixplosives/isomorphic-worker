import { worker } from '@wixc3/isomorphic-worker/worker-scope';

// eslint-disable-next-line no-console
worker.addEventListener('error', (e) => console.log(e));
worker.addEventListener('message', (e) => {
    // eslint-disable-next-line no-console
    console.log(`Second worker received: ${e.data}`);

    worker.postMessage('Hello from worker 2 (nested worker)');
});
