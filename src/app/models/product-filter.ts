import { SortDirection } from '@angular/material/sort';

export type ProductFilter = Partial<{
  page: number;
  limit: number;
  search: string;
  category: string[];
  type: string[];
  status: string;
  sortBy: string;
  sortOrder: SortDirection;
}>;
