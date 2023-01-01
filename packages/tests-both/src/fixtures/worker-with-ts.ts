import ts from 'typescript';
import { worker } from '@wixc3/isomorphic-worker/worker-scope';

worker.addEventListener('error', (e) => console.log(e));
worker.addEventListener('message', (e) => {
    worker.postMessage('Hello from worker, ts: ' + JSON.stringify(ts.parseJsonText('', '{}')));
});
