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
    return this.http.get('/real-estate', { cache: true, params, clearCache });
  }

  /**
   * Get real estate by id
   * @param data
   */
  createRealEstate(data: RealEstateRequest): Observable<void> {
    return this.http.post('/real-estate', data);
  }
}
