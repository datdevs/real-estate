import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginatedResponse, ProductFilter, RealEstate } from '../../models';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class RealEstateService {
  private readonly http = inject(HttpService);

  /**
   * Get real estate
   */
  getRealEstate(params?: ProductFilter, cache = true): Observable<PaginatedResponse<RealEstate>> {
    return this.http.get('/real-estate', { cache, params });
  }
}
