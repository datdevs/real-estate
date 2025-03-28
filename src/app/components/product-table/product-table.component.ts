import { CurrencyPipe, DatePipe, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource,
} from '@angular/material/table';
import { RealEstate } from '../../models';
import { ProductStore } from '../../store';
import { BadgeComponent } from '../badge/badge.component';

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
  ],
  templateUrl: './product-table.component.html',
  styleUrl: './product-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductTableComponent {
  readonly productStore = inject(ProductStore);

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
      name: 'quantity',
      label: 'Quantity',
    },
    {
      name: 'createdAt',
      label: 'Created At',
    },
  ];
  readonly tableColumnKeys = this.tableColumns.map((column) => column.name);

  constructor() {
    this.dataSource = computed(() => {
      return new MatTableDataSource<RealEstate>(this.productStore.realEstates());
    });
  }
}
