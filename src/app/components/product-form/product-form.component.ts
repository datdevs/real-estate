import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { PRODUCT_CATEGORIES, PRODUCT_TYPES } from '../../core/constant';
import { RealEstateFormType } from '../../models/types';

@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInput, MatSelect, MatOption],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductFormComponent {
  form!: FormGroup<RealEstateFormType>;
  formRowClass = 'grid grid-cols-2 gap-x-5 gap-y-3';

  readonly typeOptions = PRODUCT_TYPES;
  readonly categoryOptions = PRODUCT_CATEGORIES;

  private readonly fb = inject(FormBuilder);

  constructor() {
    this.initForm();
  }

  /**
   * Initialize form
   * @private
   */
  private initForm(): void {
    this.form = this.fb.group({
      name: this.fb.control('', { nonNullable: true }),
      type: this.fb.control('', { nonNullable: true }),
      category: this.fb.control('', { nonNullable: true }),
      description: this.fb.control('', { nonNullable: true }),
      location: this.fb.control('', { nonNullable: true }),
      price: this.fb.control(0, { nonNullable: true }),
      imageUrl: this.fb.control('', { nonNullable: true }),
      quantity: this.fb.control(0, { nonNullable: true }),
    });
  }
}
