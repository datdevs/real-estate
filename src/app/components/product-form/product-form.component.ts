import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { PRODUCT_CATEGORIES, PRODUCT_TYPES } from '../../core/constant';
import { FormService } from './services/form.service';

@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInput, MatSelect, MatOption, MatIcon],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductFormComponent {
  formRowClass = 'grid grid-cols-2 gap-x-5 gap-y-3';

  readonly typeOptions = PRODUCT_TYPES;
  readonly categoryOptions = PRODUCT_CATEGORIES;

  readonly formService = inject(FormService);

  constructor() {
    this.formService.initForm();
  }
}
