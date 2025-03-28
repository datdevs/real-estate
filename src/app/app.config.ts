import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { provideRouter, withViewTransitions } from '@angular/router';
import { Notify } from 'notiflix';

import { appRoutes } from './app.routes';
import { HttpInterceptors } from './core/interceptors';
import { RequestCache, RequestCacheService } from './core/services';

Notify.init({
  className: 'notif',
  clickToClose: true,
  timeout: 5000,
  cssAnimationStyle: 'from-right',
  cssAnimationDuration: 600,
  fontFamily: `ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`,
  fontSize: '12px',
  success: {
    background: '#66bb6a',
    notiflixIconColor: '#fff',
    textColor: '#fff',
  },
  failure: {
    background: '#e53935',
    notiflixIconColor: '#fff',
    textColor: '#fff',
  },
  warning: {
    background: '#ffca28',
    notiflixIconColor: '#424242',
    textColor: '#424242',
  },
  info: {
    background: '#42a5f5',
    notiflixIconColor: '#fff',
    textColor: '#fff',
  },
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes, withViewTransitions()),
    provideHttpClient(withInterceptors(HttpInterceptors)),

    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
    { provide: RequestCache, useClass: RequestCacheService },
    RequestCacheService,
  ],
};
