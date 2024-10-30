import { JwtPayload } from "jwt-decode";

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

export interface responsePaginatedBrands{
  brands: {id:number, name:string, description:string}[];
  currentPage: number;
  totalPages: number;
  totalElements: number;
}



export interface userAux{
  name: string,
  lastName: string,
  identification: number,
  phoneNumber: string,
  birthDate: string,
  email: string,
  password: string
}




export interface TokenPayload extends JwtPayload{
  role: string,
  User_id: number
}
