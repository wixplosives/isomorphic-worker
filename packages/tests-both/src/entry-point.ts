import { join } from '@file-services/path';
import { Worker } from '@dazl/isomorphic-worker/worker';

const isNode =
    typeof process === 'object' && typeof process.versions === 'object' && typeof process.versions.node !== 'undefined';

export function initWorker() {
    const worker = new Worker(
        isNode ? join(import.meta.dirname, 'fixtures', './worker-with-ts.js') : './webpack-entry-worker-with-ts.js',
    );
    return worker;
}
