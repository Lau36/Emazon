export interface createCategory{
  categoryName: string;
  categoryDescription: string;
}

export interface createBrand{
  name: string;
  description: string;
}

export interface listCategories{
  page: number;
  size: number;
  sort: string;
  sortDirection: string;
}

export interface pagination{
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

export interface responsePaginatedBrands{
  brands: {id:number, name:string, description:string}[];
  currentPage: number;
  totalPages: number;
  totalElements: number;
}
