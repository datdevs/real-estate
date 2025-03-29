import { ChangeDetectionStrategy, Component, effect, inject, OnDestroy, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { OPERATION_STATE } from '../../core/constant';
import { RealEstate } from '../../models';
import { RealEstateFormType } from '../../models/types';
import { ProductStore } from '../../store';
import { ProductFormComponent } from '../product-form/product-form.component';
import { FormService } from '../product-form/services/form.service';

export type ProductDialogProps = {
  id?: string;
};

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
  readonly dialogTitle = signal<string>('New Product');

  private readonly currentProduct!: RealEstate;

  private readonly formService = inject(FormService);
  private readonly dialogRef = inject(MatDialogRef<ProductDialogComponent>);
  private readonly dialogData: ProductDialogProps = inject(MAT_DIALOG_DATA);

  constructor() {
    effect(() => {
      if (this.store.createUpdateRealEstateStatus().status === OPERATION_STATE.Success) {
        this.dialogRef.close();
      }
    });

    if (this.dialogData?.id) {
      this.currentProduct = this.store.realEstates().results.find((product) => product.id === this.dialogData.id)!;
      this.dialogTitle.set(`Edit "${this.currentProduct.name}"`);
      this._patchFormValues();
    }
  }

  ngOnDestroy(): void {
    this.store.resetCreateProductStatus();
  }

  /**
   * Saves the product
   */
  saveProduct(): void {
    if (this.store.createUpdateRealEstateStatus().inProgress) return;

    const { form } = this.formService;

    form.markAllAsTouched();

    if (form.invalid) return;

    if (this.currentProduct) {
      this._updateProduct(form);
    } else {
      this._createProduct(form);
    }
  }

  /**
   * Patches the form values with the current product data
   * @private
   */
  private _patchFormValues(): void {
    const { form } = this.formService;

    if (this.currentProduct) {
      form.patchValue(this.currentProduct);
    }
  }

  /**
   * Creates a new product
   * @param form
   * @private
   */
  private _createProduct(form: FormGroup<RealEstateFormType>): void {
    this.store.createProduct({ data: form.getRawValue() });
  }

  /**
   * Updates an existing product
   * @param form
   * @private
   */
  private _updateProduct(form: FormGroup<RealEstateFormType>): void {
    this.store.updateProduct({ id: this.dialogData.id!, data: form.getRawValue() });
  }
}
