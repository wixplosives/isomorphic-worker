import { NodeWorker as Worker } from '../../node/worker.js';
import { createDisposables } from '@wixc3/create-disposables';
import { expect } from 'chai';

describe('NodeWorker', () => {
    const disposables = createDisposables();

    afterEach(disposables.dispose);

    it('can send and receive messages', async function () {
        const worker = new Worker(new URL('../fixtures/node-worker-user.js', import.meta.url));
        disposables.add(() => worker.terminate());

        await new Promise<void>((resolve) => {
            worker.addEventListener('message', (message) => {
                expect(message.data).to.eq('Hello from the worker!');
                resolve();
            });
            worker.postMessage('Hello from the main thread!');
        });
    });
});
