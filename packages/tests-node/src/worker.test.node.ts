import { Worker } from '@dazl/isomorphic-worker/worker';
import { createDisposables } from '@dazl/create-disposables';
import { expect } from 'chai';

describe('NodeWorker', () => {
    const disposables = createDisposables();

    afterEach(disposables.dispose);

    it('can send and receive messages', async function () {
        const worker = new Worker(new URL(import.meta.resolve('./fixtures/node-worker-user.js')));
        disposables.add(() => worker.terminate());

        await new Promise<void>((resolve) => {
            worker.addEventListener('message', ({ data }) => {
                type ExpectedMessageType = {
                    originalMessage: string;
                    workerMessage: string;
                };

                expect((data as ExpectedMessageType).originalMessage).to.eq('Hello from the main thread!');
                expect((data as ExpectedMessageType).workerMessage).to.eq('Hello from the worker!');
                resolve();
            });
            worker.postMessage('Hello from the main thread!');
        });
    });

    it('gets the initial worker data', async function () {
        const worker = new Worker(new URL(import.meta.resolve('./fixtures/node-worker-user.js')), {
            workerData: 'initial worker data',
        });
        disposables.add(() => worker.terminate());

        await new Promise<void>((resolve) => {
            worker.addEventListener('message', ({ data }) => {
                type ExpectedMessageType = {
                    originalMessage: string;
                    workerMessage: string;
                    workerData: string;
                };
                expect((data as ExpectedMessageType).originalMessage).to.eq('Hello from the main thread!');
                expect((data as ExpectedMessageType).workerMessage).to.eq('Hello from the worker!');
                expect((data as ExpectedMessageType).workerData).to.eq('initial worker data');
                resolve();
            });
            worker.postMessage('Hello from the main thread!');
        });
    });
});
