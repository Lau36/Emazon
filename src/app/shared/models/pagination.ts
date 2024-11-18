export interface Pagination{
  page: number;
  size: number;
  sort: string;
  sortDirection: string;
}

export interface CartPagination{
  page: number;
  size: number;
  sort: string;
  sortDirection: string;
  filter: string;
  filterName: string
}
