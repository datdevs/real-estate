import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, of, startWith, tap } from 'rxjs';
import { CACHING_ENABLED } from '../constant';
import { RequestCache } from '../services';

export const cacheInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  if (req.context.get(CACHING_ENABLED)) {
    const cache = inject(RequestCache);
    const cachedResponse = cache.get(req);

    // Cache-then-refresh
    if (req.headers.get('x-refresh')) {
      const results$ = sendRequest(req, next, cache);
      return cachedResponse ? results$.pipe(startWith(cachedResponse)) : results$;
    }

    // Cache-or-fetch
    return cachedResponse ? of(cachedResponse) : sendRequest(req, next, cache);
  } else {
    return next(req);
  }
};

/**
 * Get server response observable by sending request to `next()`.
 * Will add the response to the cache on the way out.
 */
function sendRequest(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
  cache: RequestCache,
): Observable<HttpEvent<unknown>> {
  return next(req).pipe(
    tap((event) => {
      // There may be other events besides the response.
      if (event instanceof HttpResponse) {
        cache.put(req, event); // Update the cache.
      }
    }),
  );
}
