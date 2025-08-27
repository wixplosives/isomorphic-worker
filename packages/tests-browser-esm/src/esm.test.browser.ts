import { Worker } from '@dazl/isomorphic-worker/worker';
import { createDisposables } from '@dazl/create-disposables';
import { expect } from 'chai';

describe('BrowserWorker', () => {
    const disposables = createDisposables();

    afterEach(disposables.dispose);

    it('can send and receive messages', async function () {
        const worker = new Worker(new URL('./fixtures/browser-worker-user.js', import.meta.url), { type: 'module' });

        disposables.add(() => worker.terminate());

        await new Promise<void>((resolve) => {
            worker.addEventListener('message', (message) => {
                expect(message.data).to.eq('Hello from the worker!');
                resolve();
            });
            worker.postMessage('Hello from the main thread!');
        });
    });

    // it("can be terminated", (done) => {
    //   const worker = new Worker("../fixtures/worker.ts");
    //   worker.onMessage(() => {
    //     // This should not be called because the worker should be terminated before it can send a message
    //     expect(true).to.eq(false);
    //     done();
    //   });
    //   worker.terminate();
    //   worker.postMessage("worker should be terminated");
    //   // Give the worker a chance to send a message before the test ends
    //   setTimeout(done, 100);
    // });
});
