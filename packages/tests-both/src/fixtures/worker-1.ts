import { worker } from '@wixc3/isomorphic-worker/worker-scope';
import { Worker } from '@wixc3/isomorphic-worker/worker';

// eslint-disable-next-line no-console
worker.addEventListener('error', (e) => console.log(e));
worker.addEventListener('message', (e) => {
    const worker2 = new Worker('./worker-2.js'); // see webpack.config.js
    worker2.addEventListener('message', (message: any) => {
        worker.postMessage(message.data);
    });
    worker2.postMessage(e.data);
});
