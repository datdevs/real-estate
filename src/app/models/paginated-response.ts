export interface PaginatedResponse<T = any> {
  results: T[];
  total: number;
}
