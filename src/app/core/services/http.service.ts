import { HttpClient, HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { isEmpty } from '../../utils';
import { CACHING_CLEAR, CACHING_ENABLED, CACHING_TTL } from '../constant';

type HttpClientOptions = {
  headers?: HttpHeaders | Record<string, string | string[]>;
  params?: HttpParams | Record<string, string | number | boolean | readonly (string | number | boolean)[]>;
  context?: HttpContext;
  observe?: 'body' | 'response' | 'events';
  responseType?: 'json' | 'text' | 'blob' | 'arraybuffer';
  reportProgress?: boolean;
  withCredentials?: boolean;
  cache?: boolean;
  cacheTTL?: number;
  clearCache?: boolean;
};

type ResponseTypeJson = {
  responseType?: 'json';
};

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private readonly http = inject(HttpClient);
  private readonly headers: HttpHeaders = new HttpHeaders();

  /**
   * Get request
   * @param url
   * @param options
   */
  get(url: string, options?: HttpClientOptions): Observable<any> {
    const httpOptions = this._prepareOptions(options);

    return this.http.get(url, httpOptions as ResponseTypeJson);
  }

  /**
   * Post request
   * @param url
   * @param body
   * @param options
   */
  post(url: string, body: unknown | null, options?: HttpClientOptions): Observable<any> {
    const httpOptions = this._prepareOptions(options);

    return this.http.post<any>(url, body, httpOptions as ResponseTypeJson);
  }

  /**
   * Put request
   * @param url
   * @param body
   * @param options
   */
  put<T>(url: string, body: unknown | null, options?: HttpClientOptions): Observable<unknown> {
    const httpOptions = this._prepareOptions(options);

    return this.http.put<T>(url, body, httpOptions as ResponseTypeJson);
  }

  /**
   * Delete request
   * @param url
   * @param options
   */
  delete<T>(url: string, options?: HttpClientOptions & { body?: unknown }): Observable<unknown> {
    const httpOptions = this._prepareOptions(options);

    return this.http.delete<T>(url, httpOptions as ResponseTypeJson);
  }

  /**
   * Patch request
   * @param url
   * @param body
   * @param options
   */
  patch<T>(url: string, body: unknown | null, options?: HttpClientOptions): Observable<unknown> {
    const httpOptions = this._prepareOptions(options);

    return this.http.patch<T>(url, body, httpOptions as ResponseTypeJson);
  }

  /**
   * Prepare options for the request
   * @param options
   * @private
   */
  private _prepareOptions(options?: HttpClientOptions): HttpClientOptions {
    const defaultOptions = {
      observe: options?.observe ?? 'body',
      responseType: options?.responseType ?? 'json',
    };

    const context: HttpContext = options?.context ?? new HttpContext();

    if (options?.cache) {
      context.set(CACHING_ENABLED, true);

      if (options?.cacheTTL) {
        context.set(CACHING_TTL, options.cacheTTL);
      }
    }

    if (options?.clearCache) {
      context.set(CACHING_CLEAR, true);
    }

    return {
      ...options,
      ...defaultOptions,
      headers: this._checkHeaders(options?.headers),
      context,
    };
  }

  /**
   * Check headers and add to the request
   * @param headers
   * @private
   */
  private _checkHeaders(headers?: HttpHeaders | Record<string, string | string[]>): HttpHeaders {
    if (!headers || isEmpty(headers)) return this.headers;

    let newHeaders = this.headers;

    const processHeader = (key: string, value: string | string[]) => {
      newHeaders = newHeaders.delete(key).set(key, value);
    };

    if (headers instanceof HttpHeaders) {
      headers.keys().forEach((key) => processHeader(key, headers.get(key) ?? ''));
    } else {
      Object.entries(headers).forEach(([key, value]) => processHeader(key, value));
    }

    return newHeaders;
  }
}
