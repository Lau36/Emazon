export interface CategoriesListresponse{
  categories: CategoryCreatedresponse[];
  currentPage: number;
  totalPages: number;
  totalElements: number;
}

export interface CategoryCreatedresponse{
  id: number;
  categoryName: string;
  categoryDescription: string;
}

