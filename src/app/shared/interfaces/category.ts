export interface responseListCategories{
  categories: responseCreateCategory[];
  currentPage: number;
  totalPages: number;
  totalElements: number;
}

export interface responseCreateCategory{
  id: number;
  categoryName: string;
  categoryDescription: string;
}

