import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddCart } from '../models/cart';
import { Observable } from 'rxjs';
import { cartMicroservice } from '../constants/microservicesUrl';
import { addItemToCartResponse} from '../interfaces/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private Http: HttpClient) { }

  addItemToCart(data: AddCart): Observable<addItemToCartResponse>{
    const params = new HttpParams()
    .set('itemId', data.itemId)
    .set('quantity', data.quantity)
    return this.Http.post<addItemToCartResponse>(cartMicroservice+'/Cart', null, {params});
  }
}
