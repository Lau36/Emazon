export interface responsePaginatedItems{
  items:{id: number, name: string, description: string, quantityInStock: number, price: number,
          categories: {id: number, name: string}[],
           brand:{id: number, name: string}
        }[];
  currentPage: number;
  totalPages: number;
  totalElements: number;
}

export interface responseCreateItem{
  message: string;
  name: string;
  description: string;
}

