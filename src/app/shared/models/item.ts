export interface createItem{
  name: string;
  description: string;
  amount: number,
  price: number,
  idCategories: number[],
  idBrand: number
}

export interface itemsWithPrice{
  id: number,
  name: string,
  price: number,
}
