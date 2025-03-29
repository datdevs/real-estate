import { CurrencyPipe, DatePipe, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortHeader, Sort } from '@angular/material/sort';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatNoDataRow,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource,
} from '@angular/material/table';
import { RealEstate } from '../../models';
import { ProductStore } from '../../store';
import { AddProductButtonComponent } from '../add-product-button/add-product-button.component';
import { BadgeComponent } from '../badge/badge.component';
import { EmptyRecordComponent } from '../empty-record/empty-record.component';
import { ProductFilterComponent } from '../product-filter/product-filter.component';
import { TableRowActionsComponent } from '../table-row-actions/table-row-actions.component';

@Component({
  selector: 'app-product-table',
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCellDef,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
    NgOptimizedImage,
    BadgeComponent,
    CurrencyPipe,
    DatePipe,
    MatPaginator,
    MatNoDataRow,
    EmptyRecordComponent,
    MatSortHeader,
    MatSort,
    AddProductButtonComponent,
    TableRowActionsComponent,
    ProductFilterComponent,
  ],
  templateUrl: './product-table.component.html',
  styleUrl: './product-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductTableComponent {
  readonly store = inject(ProductStore);
  readonly dataSource: Signal<MatTableDataSource<RealEstate>>;
  readonly tableColumns = [
    {
      name: 'imageUrl',
      label: '',
    },
    {
      name: 'name',
      label: 'Name',
    },
    {
      name: 'type',
      label: 'Type',
    },
    {
      name: 'category',
      label: 'Category',
    },
    {
      name: 'price',
      label: 'Price',
    },
    {
      name: 'createdAt',
      label: 'Created At',
    },
    {
      name: 'updatedAt',
      label: 'Updated At',
    },
    {
      name: 'actions',
      label: '',
    },
  ];
  readonly tableColumnKeys = this.tableColumns.map((column) => column.name);

  constructor() {
    this.dataSource = computed(() => {
      const { results } = this.store.realEstates();
      return new MatTableDataSource<RealEstate>(results);
    });
  }

  /**
   * Page event handler for pagination
   * @param event
   */
  pageEvent(event: PageEvent) {
    this.store.updateFilter({ limit: event.pageSize, page: event.pageIndex });
  }

  /**
   * Sort event handler for sorting
   * @param event
   */
  sortData(event: Sort) {
    this.store.updateFilter({ sortBy: event.active, sortOrder: event.direction });
  }
}
