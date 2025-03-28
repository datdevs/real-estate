export type ProductFilter = Partial<{
  page: number;
  limit: number;
  search: string;
  category: string;
  type: string;
  price: number;
  location: string;
  sortBy: string;
}>;
