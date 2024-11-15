import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddCart, Cart } from '../models/cart';
import { Observable } from 'rxjs';
import { cartMicroservice } from '../constants/microservicesUrl';
import { addItemToCartResponse} from '../interfaces/cart';
import { CartPagination } from '../models/pagination';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private Http: HttpClient) { }

  addItemToCart(data: AddCart): Observable<addItemToCartResponse>{
    const params = new HttpParams()
    .set('itemId', data.itemId)
    .set('quantity', data.quantity)
    return this.Http.post<addItemToCartResponse>(cartMicroservice, null, {params});
  }

  viewCart(data: CartPagination): Observable<Cart>{
    const params = new HttpParams()
    .set('page', data.page)
    .set('size', data.size)
    .set('sort', data.sort)
    .set('sortDirection', data.sortDirection)
    .set('filter', data.filter)
    .set('filterName', data.filterName);
    return this.Http.get<Cart>(cartMicroservice, {params});
  }

  removeItemFromCart(itemId: number): Observable<string>{
    const params = new HttpParams().set('itemId', itemId);
    return this.Http.delete<string>(cartMicroservice, {params});
  }
}
