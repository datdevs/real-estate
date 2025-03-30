import { HttpEventType, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';
import { UploaderService } from '../services';

export const uploadInterceptor: HttpInterceptorFn = (req, next) => {
  const uploaderService = inject(UploaderService);

  if (req.reportProgress && req.body instanceof FormData) {
    const file = req.body.get('file') as File;

    return next(req).pipe(
      tap((event) => {
        // if (event.type === HttpEventType.UploadProgress && event.total) {
        // Fake upload progress
        if (event.type === HttpEventType.DownloadProgress && event.total) {
          const progress = Math.round((100 * event.loaded) / event.total);
          uploaderService.updateProgress(file.name, progress, false);
        } else if (event instanceof HttpResponse) {
          uploaderService.updateProgress(file.name, 100, true);
        }
      }),
      catchError((error) => {
        uploaderService.removeProgress(file.name);
        uploaderService.updateFailedFiles(file.name);
        return throwError(() => error);
      }),
    );
  }

  return next(req);
};
