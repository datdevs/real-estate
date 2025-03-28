import { inject, Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class RealEstateService {
  private readonly http = inject(HttpService);

  /**
   * Get real estate
   */
  getRealEstate(cache = true) {
    return this.http.get('/real-estate', { cache });
  }
}
