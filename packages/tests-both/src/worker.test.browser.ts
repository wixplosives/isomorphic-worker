import { createDisposables } from '@wixc3/create-disposables';
import { expect } from 'chai';
import { initWorker } from './entry-point';

describe('BrowserWorker', () => {
    const disposables = createDisposables();

    afterEach(disposables.dispose);

    it('can send and receive messages', async function () {
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
});
