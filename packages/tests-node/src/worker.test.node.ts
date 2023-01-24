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
                expect(message.data.originalMessage).to.eq('Hello from the main thread!');
                expect(message.data.workerMessage).to.eq('Hello from the worker!');
                resolve();
            });
            worker.postMessage('Hello from the main thread!');
        });
    });

    it('gets the initial worker data', async function () {
        const worker = new Worker(require.resolve('./fixtures/node-worker-user.js'), {
            workerData: 'initial worker data',
        });
        disposables.add(() => worker.terminate());

        await new Promise<void>((resolve) => {
            worker.addEventListener('message', (message: any) => {
                expect(message.data.originalMessage).to.eq('Hello from the main thread!');
                expect(message.data.workerMessage).to.eq('Hello from the worker!');
                expect(message.data.workerData).to.eq('initial worker data');
                resolve();
            });
            worker.postMessage('Hello from the main thread!');
        });
    });
});
