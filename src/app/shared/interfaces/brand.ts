export interface brandsPaginatedResponse{
  brands: {id:number, name:string, description:string}[];
  currentPage: number;
  totalPages: number;
  totalElements: number;
}

export interface brandCreatedResponse{
  name: string;
  description: string;
}

export interface listAllBrandsResponse{
  id: number;
  name: string;
  description: string;
}

