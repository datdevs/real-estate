import { Route } from '@angular/router';
import { ProductStore } from './store';

export const appRoutes: Route[] = [
  {
    path: '',
    title: 'Products',
    loadComponent: async () => (await import('./pages/product/product.component')).ProductComponent,
    providers: [ProductStore],
  },
];
