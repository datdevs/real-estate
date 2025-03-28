import { HttpParams, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { isEqual } from '../../utils';
import { CACHING_TTL } from '../constant';

export type RequestCacheEntry = {
  url: string;
  body: any;
  response: HttpResponse<any>;
  lastRead: number;
};

export abstract class RequestCache {
  abstract get(req: HttpRequest<any>): HttpResponse<any> | undefined;
  abstract put(req: HttpRequest<any>, response: HttpResponse<any>): void;
}

@Injectable({
  providedIn: 'root',
})
export class RequestCacheService implements RequestCache {
  cache = new Map<string, RequestCacheEntry>();

  get(req: HttpRequest<any>): HttpResponse<any> | undefined {
    const url = req.urlWithParams;
    const urlWithBody = new HttpParams({ fromObject: req.body }).toString();
    const cached = this.cache.get(url + '@' + urlWithBody);
    const cacheTtl = req.context.get(CACHING_TTL);

    if (!cached) return undefined;

    if (!isEqual(req.body, cached.body)) return undefined;

    const isExpired = cached.lastRead < Date.now() - cacheTtl;

    return isExpired ? undefined : cached.response;
  }

  put(req: HttpRequest<any>, response: HttpResponse<any>): void {
    const { body, urlWithParams: url } = req;
    const cacheTtl = req.context.get(CACHING_TTL);
    const newEntry = { url, response, body, lastRead: Date.now() };
    const urlWithBody = new HttpParams({ fromObject: body }).toString();

    this.cache.set(url + '@' + urlWithBody, newEntry);

    const expired = Date.now() - cacheTtl;

    this.cache.forEach((entry) => {
      if (entry.lastRead < expired) {
        this.cache.delete(entry.url);
      }
    });
  }
}
