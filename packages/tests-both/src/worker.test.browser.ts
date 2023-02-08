import { createDisposables } from '@wixc3/create-disposables';
import { expect } from 'chai';
import { initWorker } from './entry-point';
import { Worker } from '@wixc3/isomorphic-worker/worker';

describe('Both: BrowserWorker', function () {
    this.timeout(5_000);
    const disposables = createDisposables();

    afterEach(disposables.dispose);

    it('can send and receive messages - ts worker', async function () {
        const worker = initWorker();
        disposables.add(() => worker.terminate());

        await new Promise<void>((resolve) => {
            worker.addEventListener('message', (message: any) => {
                expect(message.data).to.include('Hello from worker');
                expect(message.data).to.include('parseDiagnostics');
                expect(message.data).to.include('languageVersion');
                expect(message.data).to.include('statements');
                resolve();
            });
            worker.postMessage('Hello from the main thread!');
        });
    });

    it('can send and receive messages from a nested worker', async function () {
        const worker = new Worker('./worker-1.js'); // see webpack.config.js
        disposables.add(() => worker.terminate());

        await new Promise<void>((resolve) => {
            worker.addEventListener('message', (message: any) => {
                expect(message.data).to.include('Hello from worker 2 (nested worker)');
                resolve();
            });
            worker.postMessage('Hello from the main thread!');
        });
    });
});
