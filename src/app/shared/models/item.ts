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
