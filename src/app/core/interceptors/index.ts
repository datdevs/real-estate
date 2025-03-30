import { HttpInterceptorFn } from '@angular/common/http';
import { cacheInterceptor } from './cache.interceptor';
import { uploadInterceptor } from './upload.interceptor';

const interceptors: HttpInterceptorFn[] = [cacheInterceptor, uploadInterceptor];

export { interceptors as HttpInterceptors };
