export interface AddItemToCartResponse{
  id: number,
  userId: number,
  itemId: number,
  quantity: number,
  updatedAt: string,
  status: string,
  deleted: boolean
}

