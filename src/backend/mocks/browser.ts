import { setupWorker } from 'msw/browser';
import { getData } from './real-estate';

const basePath = document.baseURI || '/';

const worker = setupWorker(...[getData]);

export function enableMocking() {
  return worker.start({
    serviceWorker: {
      url: `${basePath}mockServiceWorker.js`,
    },
  });
}
