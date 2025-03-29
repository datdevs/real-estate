import { ChangeDetectionStrategy, Component, inject, Injector } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { ProductStore } from '../../store';

@Component({
  selector: 'app-add-product-button',
  imports: [MatButton, MatIcon],
  templateUrl: './add-product-button.component.html',
  styleUrl: './add-product-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddProductButtonComponent {
  private readonly dialog = inject(MatDialog);
  private readonly injector = inject(Injector);

  openDialogAddProduct() {
    import('../product-dialog/product-dialog.component').then((c) => {
      const dialogInjector = Injector.create({
        providers: [{ provide: ProductStore, useFactory: () => this.injector.get(ProductStore) }],
        parent: this.injector,
      });

      this.dialog.open(c.ProductDialogComponent, {
        minWidth: '800px',
        injector: dialogInjector,
      });
    });
  }
}
