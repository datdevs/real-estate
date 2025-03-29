import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs';
import { PRODUCT_CATEGORIES, PRODUCT_TYPES } from '../../core/constant';
import { ProductStore } from '../../store';

@Component({
  selector: 'app-product-filter',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInput, MatSelect, MatOption, MatIcon],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline', subscriptSizing: 'dynamic' },
    },
  ],
  templateUrl: './product-filter.component.html',
  styleUrl: './product-filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductFilterComponent implements OnInit {
  readonly filterForm = new FormGroup({
    search: new FormControl(''),
    category: new FormControl<string[]>([]),
    type: new FormControl<string[]>([]),
    location: new FormControl(''),
    status: new FormControl('visible'),
  });

  readonly typeOptions = PRODUCT_TYPES;
  readonly categoryOptions = PRODUCT_CATEGORIES;

  private readonly store = inject(ProductStore);

  ngOnInit(): void {
    this._onFilterChange().subscribe();
  }

  /**
   * Handle filter form changes and emit the filter values to the store.
   * @private
   */
  private _onFilterChange() {
    return this.filterForm.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      tap((value) => {
        const filteredValue = this._removeEmptyValues(value);

        this.store.updateFilter(filteredValue);
      }),
    );
  }

  private _removeEmptyValues(value: any) {
    return Object.fromEntries(
      Object.entries(value).filter(([_, v]) => {
        if (Array.isArray(v)) {
          return v.length > 0;
        }
        return v !== null && v !== undefined && v !== '';
      }),
    );
  }
}
