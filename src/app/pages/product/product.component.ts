import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AddProductButtonComponent } from '../../components/add-product-button/add-product-button.component';
import { ProductFilterComponent } from '../../components/product-filter/product-filter.component';
import { ProductTableComponent } from '../../components/product-table/product-table.component';
import { MainLayoutComponent } from '../../layouts/main-layout/main-layout.component';
import { ProductStore } from '../../store';

@Component({
  selector: 'app-product',
  imports: [ProductTableComponent, MainLayoutComponent, AddProductButtonComponent, ProductFilterComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent {
  private readonly store = inject(ProductStore);

  constructor() {
    this.store.loadProduct({});
  }
}
