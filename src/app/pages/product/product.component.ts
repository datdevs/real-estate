import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ProductTableComponent } from '../../components/product-table/product-table.component';
import { MainLayoutComponent } from '../../layouts/main-layout/main-layout.component';
import { ProductStore } from '../../store';

@Component({
  selector: 'app-product',
  imports: [ProductTableComponent, MainLayoutComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent {
  private readonly productStore = inject(ProductStore);

  constructor() {
    this.productStore.loadProduct({});
  }
}
