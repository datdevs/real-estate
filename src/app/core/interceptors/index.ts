import { HttpInterceptorFn } from '@angular/common/http';
import { cacheInterceptor } from './cache.interceptor';

const interceptors: HttpInterceptorFn[] = [cacheInterceptor];

export { interceptors as HttpInterceptors };
