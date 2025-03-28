import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-add-product-button',
  imports: [MatButton, MatIcon],
  templateUrl: './add-product-button.component.html',
  styleUrl: './add-product-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddProductButtonComponent {
  private readonly dialog = inject(MatDialog);

  openDialogAddProduct() {
    import('../product-dialog/product-dialog.component').then((c) => {
      this.dialog.open(c.ProductDialogComponent, {
        minWidth: '800px',
      });
    });
  }
}
