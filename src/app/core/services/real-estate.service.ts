import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginatedResponse, ProductFilter, RealEstate, RealEstateRequest } from '../../models';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class RealEstateService {
  private readonly http = inject(HttpService);

  /**
   * Get real estate
   */
  getRealEstate(params?: ProductFilter, clearCache = false): Observable<PaginatedResponse<RealEstate>> {
    const formattedParams = {
      ...params,
      ...(params?.category && { category: params?.category.toString() }),
      ...(params?.type && { type: params?.type.toString() }),
    };

    return this.http.get('/real-estate', { cache: true, params: formattedParams, clearCache });
  }

  /**
   * Create real estate
   * @param data
   */
  createRealEstate(data: RealEstateRequest): Observable<void> {
    return this.http.post('/real-estate', data);
  }

  /**
   * Update real estate by id
   * @param id
   * @param data
   */
  updateRealEstate(id: string, data: RealEstateRequest): Observable<void> {
    return this.http.put(`/real-estate/${id}`, data);
  }

  /**
   * Delete real estate by id
   * @param id
   */
  deleteRealEstate(id: string): Observable<void> {
    return this.http.delete(`/real-estate/${id}`);
  }
}
