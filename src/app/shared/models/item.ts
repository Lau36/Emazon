import { Brand } from "./brand";
import { Category } from "./category";

export interface CreateItem{
  name: string;
  description: string;
  amount: number,
  price: number,
  idCategories: number[],
  idBrand: number
}

export interface ItemsWithPrice{
  id: number,
  name: string,
  price: number,
}


export interface ItemInCart{
  id: number,
  name: string,
  description: string,
  quantityInCart: number,
  quantityInStock: number,
  areStock: boolean,
  nextSupplyDate: string,
  price: number,
  categories: Category[],
  brand: Brand
}

