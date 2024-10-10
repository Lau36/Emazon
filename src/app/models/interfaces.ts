export interface createCategory{
  categoryName: string;
  categoryDescription: string;
}

export interface listCategories{
  page: number;
  size: number;
  sort: string;
  sortDirection: string;
}

export interface responseListCategories{
  categories: any[];
  currentPage: number;
  totalPages: number;
  totalElements: number;
}
