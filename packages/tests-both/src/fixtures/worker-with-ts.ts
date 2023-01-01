import ts from 'typescript';
import { worker } from '@wixc3/isomorphic-worker/worker-scope';

// eslint-disable-next-line no-console
worker.addEventListener('error', (e) => console.log(e));
worker.addEventListener('message', (_e) => {
    worker.postMessage('Hello from worker, ts: ' + JSON.stringify(ts.parseJsonText('', '{}')));
});
