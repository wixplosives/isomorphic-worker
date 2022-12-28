import { Worker } from '@wixc3/isomorphic-worker/worker';
import { createDisposables } from '@wixc3/create-disposables';
import { expect } from 'chai';

describe('NodeWorker', () => {
    const disposables = createDisposables();

    afterEach(disposables.dispose);

    it('can send and receive messages', async function () {
        const worker = new Worker(require.resolve('./fixtures/node-worker-user.js'));
        disposables.add(() => worker.terminate());

        await new Promise<void>((resolve) => {
            worker.addEventListener('message', (message: any) => {
                expect(message.data).to.eq('Hello from the worker!');
                resolve();
            });
            worker.postMessage('Hello from the main thread!');
        });
    });
});
