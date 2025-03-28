import { setupWorker } from 'msw/browser';
import { getData } from './real-estate';

const worker = setupWorker(...[getData]);

export function enableMocking() {
  return worker.start();
}
