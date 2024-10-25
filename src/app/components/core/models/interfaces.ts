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

export interface responsePaginatedItems{
  items:{id: number, name: string, description: string, quantityInStock: number, price: number,
          categories: {id: number, name: string}[],
           brand:{id: number, name: string}
        }[];
  currentPage: number;
  totalPages: number;
  totalElements: number;
}

export interface createItem{
  name: string;
  description: string;
  amount: number,
  price: number,
  idCategories: number[],
  idBrand: number
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

export interface auth{
  email: string;
  password: string
}

export interface authResponse{
  token: string
}

export interface TokenPayload extends JwtPayload{
  role: string,
  User_id: number
}
