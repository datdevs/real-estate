import { setupWorker } from 'msw/browser';
import { getData, postData, updateData } from './real-estate';

const basePath = document.baseURI || '/';

const worker = setupWorker(...[getData, postData, updateData]);

export function enableMocking() {
  return worker.start({
    serviceWorker: {
      url: `${basePath}mockServiceWorker.js`,
    },
  });
}
