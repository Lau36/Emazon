export interface BrandsPaginatedResponse{
  brands: {id:number, name:string, description:string}[];
  currentPage: number;
  totalPages: number;
  totalElements: number;
}

export interface BrandCreatedResponse{
  name: string;
  description: string;
}

export interface ListAllBrandsResponse{
  id: number;
  name: string;
  description: string;
}

