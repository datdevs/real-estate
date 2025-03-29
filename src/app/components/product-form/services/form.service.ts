import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RealEstateFormType } from '../../../models/types';

@Injectable()
export class FormService {
  form!: FormGroup<RealEstateFormType>;

  private readonly fb = inject(FormBuilder);

  constructor() {
    this.initForm();
  }

  /**
   * Initialize form
   * @private
   */
  initForm(): void {
    this.form = this.fb.group({
      name: this.fb.control('', { nonNullable: true }),
      type: this.fb.control('', { nonNullable: true }),
      category: this.fb.control('', { nonNullable: true }),
      description: this.fb.control('', { nonNullable: true }),
      location: this.fb.control('', { nonNullable: true }),
      price: this.fb.control(0, { nonNullable: true }),
      imageUrl: this.fb.control('', { nonNullable: true }),
    });
  }
}
