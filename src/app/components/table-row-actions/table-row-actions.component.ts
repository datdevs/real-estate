import { ChangeDetectionStrategy, Component, inject, Injector, input } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { ProductStore } from '../../store';
import { ProductDialogProps } from '../product-dialog/product-dialog.component';

@Component({
  selector: 'app-table-row-actions',
  imports: [MatIconButton, MatMenu, MatMenuTrigger, MatIcon, MatMenuItem],
  templateUrl: './table-row-actions.component.html',
  styleUrl: './table-row-actions.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableRowActionsComponent {
  productId = input.required<string>();

  private readonly dialog = inject(MatDialog);
  private readonly injector = inject(Injector);

  onClickEdit() {
    import('../product-dialog/product-dialog.component').then((c) => {
      const dialogInjector = Injector.create({
        providers: [{ provide: ProductStore, useFactory: () => this.injector.get(ProductStore) }],
        parent: this.injector,
      });

      this.dialog.open(c.ProductDialogComponent, {
        minWidth: '800px',
        data: { id: this.productId() } as ProductDialogProps,
        injector: dialogInjector,
      });
    });
  }

  onClickDelete() {
    import('../confirmation-dialog/confirmation-dialog.component').then((c) => {
      this.dialog.open(c.ConfirmationDialogComponent, {
        data: {
          title: 'Delete Product',
          message: 'Are you sure you want to delete this product?',
          confirmButtonText: 'Delete',
          cancelButtonText: 'Cancel',
        },
      });
    });
  }
}
