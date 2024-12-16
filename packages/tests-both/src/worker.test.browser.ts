import { createDisposables } from '@wixc3/create-disposables';
import { Worker } from '@wixc3/isomorphic-worker/worker';
import { log, logMessage } from './log.js';

describe('Both: BrowserWorker', function () {
    this.timeout(5_000);
    const disposables = createDisposables();

    afterEach(disposables.dispose);

    it('can send and receive messages from a nested worker', async function () {
        /**
               ┌────────┐
               │  main  │
               └────┬───┘
               ┌────┴───┐
               │ worker │
               └────┬───┘
            ┌───────┴─────┐
            │nested worker│
            └─────────────┘
         */
        const worker = new Worker('./worker-1.js'); // see webpack.config.js
        disposables.add(() => worker.terminate());

        await new Promise<void>((resolve) => {
            worker.addEventListener('message', (message) => {
                log('Main thread (test file) got message from worker 1:', message);
                if (typeof message.data === 'string' && message.data.includes('Hello from worker 2 (nested worker)')) {
                    resolve();
                }
            });
            worker.postMessage('Hello from the main thread!');
        });
    });

    it('can send and receive messages from multiple nested workers', async function () {
        /**
                      ┌────────┐
                      │  main  │
                      └────┬───┘
                      ┌────┴───┐
                      │ worker │
                      ├────────┤
             ┌────────┤        ├─────────┐
             │worker-a│        │ worker-b│
             └────────┘        └─────────┘
         */
        const worker = new Worker('./worker-3-multi-nested.js'); // see webpack.config.js
        disposables.add(() => worker.terminate());
        const messagesData: string[] = [];
        await new Promise<void>((resolve) => {
            worker.addEventListener('message', ({ data }) => {
                logMessage('Main thread (test file)', data);

                if (typeof data === 'string') {
                    messagesData.push(data);
                }
                if (
                    messagesData.includes(`Hello from nested worker with id: a`) &&
                    messagesData.includes(`Hello from nested worker with id: b`)
                ) {
                    resolve();
                }
            });
            worker.postMessage('Hello from the main thread!');
        });
    });

    it('can send and receive messages from deep nested workers', async function () {
        /**
                ┌────────┐
                │  main  │
                └────┬───┘
                ┌────┴───┐
                │ worker │
                └────┬───┘
             ┌───────┴─────┐
             │nested worker│
             └───────┬─────┘
           ┌─────────┴────────┐
           │deep nested worker│
           └──────────────────┘
         */

        const worker = new Worker('./first.js'); // see webpack.config.js
        disposables.add(() => worker.terminate());
        await new Promise<void>((resolve) => {
            worker.addEventListener('message', ({ data }) => {
                logMessage('Main thread (test file)', data);
                if (typeof data === 'string' && data.includes('Hello from nested worker with id: third-level')) {
                    resolve();
                }
            });
            worker.postMessage('Hello from the main thread!');
        });
    });
});
