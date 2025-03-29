import { ChangeDetectionStrategy, Component, effect, inject, OnDestroy } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { OPERATION_STATE } from '../../core/constant';
import { ProductStore } from '../../store';
import { ProductFormComponent } from '../product-form/product-form.component';
import { FormService } from '../product-form/services/form.service';

@Component({
  selector: 'app-product-dialog',
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatDialogTitle,
    ProductFormComponent,
    MatButton,
    MatDialogClose,
    MatProgressSpinner,
  ],
  providers: [FormService],
  templateUrl: './product-dialog.component.html',
  styleUrl: './product-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDialogComponent implements OnDestroy {
  readonly store = inject(ProductStore);

  private readonly formService = inject(FormService);
  private readonly dialogRef = inject(MatDialogRef<ProductDialogComponent>);

  constructor() {
    effect(() => {
      if (this.store.createRealEstateStatus().status === OPERATION_STATE.Success) {
        this.dialogRef.close();
      }
    });
  }

  ngOnDestroy(): void {
    this.store.resetCreateProductStatus();
  }

  /**
   * Saves the product
   */
  saveProduct(): void {
    if (this.store.createRealEstateStatus().inProgress) return;

    const { form } = this.formService;

    form.markAllAsTouched();

    if (form.invalid) return;

    this.store.createProduct({ data: form.getRawValue() });
  }
}
