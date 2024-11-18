import { ItemInCart } from "./item";

export interface AddCart{
  itemId: number,
  quantity: number;
}

export interface Cart{
  items: ItemInCart[]
  totalPrice: number,
  currentPage: number,
  totalPages: number,
  totalElements: number
}
