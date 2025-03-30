import { setupWorker } from 'msw/browser';
import { upload } from './files/upload';
import { deleteData, getData, postData, updateData } from './real-estate';

const basePath = document.baseURI || '/';

const worker = setupWorker(...[getData, postData, updateData, deleteData, upload]);

export function enableMocking() {
  return worker.start({
    serviceWorker: {
      url: `${basePath}mockServiceWorker.js`,
    },
  });
}
