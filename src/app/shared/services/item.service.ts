import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pagination } from '../models/pagination';
import { createItem, itemsWithPrice } from '../models/item';
import { itemCreatedResponse, itemsPaginatedResponse } from '../interfaces/item';
import { stockMicroservice } from '../constants/microservicesUrl';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  constructor(private Http: HttpClient){ }

  createItem(data: createItem): Observable<itemCreatedResponse>{
    return this.Http.post<itemCreatedResponse>(stockMicroservice+'/Item', data);
  }

  listItemsPaginated(data: pagination): Observable<itemsPaginatedResponse>{

    const params = new HttpParams()
    .set('page', data.page)
    .set('size', data.size)
    .set('sort', data.sort)
    .set('sortDirection', data.sortDirection);
    return this.Http.get<itemsPaginatedResponse>(stockMicroservice+'/Item', {params});
  }

  listAllItems(): Observable<itemsWithPrice[]>{
    return this.Http.get<itemsWithPrice[]>(stockMicroservice+'/Item/GetAll');
  }
}
