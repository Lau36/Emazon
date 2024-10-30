import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pagination } from '../models/pagination';
import { createItem } from '../models/item';
import { responseCreateItem, responsePaginatedItems } from '../interfaces/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  urlMicroserviceStock: string = "http://localhost:9090/Item";
  constructor(private Http: HttpClient){ }

  createItem(data: createItem): Observable<responseCreateItem>{
    return this.Http.post<responseCreateItem>(this.urlMicroserviceStock, data);
  }

  listItemsPaginated(data: pagination): Observable<responsePaginatedItems>{
    const params = new HttpParams()
    .set('page', data.page)
    .set('size', data.size)
    .set('sort', data.sort)
    .set('sortDirection', data.sortDirection);
    return this.Http.get<responsePaginatedItems>(this.urlMicroserviceStock, {params});
  }
}
