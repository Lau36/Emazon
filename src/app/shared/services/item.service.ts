import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pagination } from '../models/pagination';
import { CreateItem, ItemsWithPrice } from '../models/item';
import { ItemCreatedResponse, ItemsPaginatedResponse } from '../interfaces/item';
import { stockMicroservice } from '../constants/microservicesUrl';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  constructor(private Http: HttpClient){ }

  createItem(data: CreateItem): Observable<ItemCreatedResponse>{
    return this.Http.post<ItemCreatedResponse>(stockMicroservice+'/Item', data);
  }

  listItemsPaginated(data: Pagination): Observable<ItemsPaginatedResponse>{

    const params = new HttpParams()
    .set('page', data.page)
    .set('size', data.size)
    .set('sort', data.sort)
    .set('sortDirection', data.sortDirection);
    return this.Http.get<ItemsPaginatedResponse>(stockMicroservice+'/Item', {params});
  }

  listAllItems(): Observable<ItemsWithPrice[]>{
    return this.Http.get<ItemsWithPrice[]>(stockMicroservice+'/Item/GetAll');
  }
}
