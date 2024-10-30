export interface categoriesListresponse{
  categories: categoryCreatedresponse[];
  currentPage: number;
  totalPages: number;
  totalElements: number;
}

export interface categoryCreatedresponse{
  id: number;
  categoryName: string;
  categoryDescription: string;
}

