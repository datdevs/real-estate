import { inject, Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  private readonly http = inject(HttpService);

  /**
   * Upload file
   * @param file
   */
  upload(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post('/api/upload', formData, {
      reportProgress: true,
    });
  }
}
