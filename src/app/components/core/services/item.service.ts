import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createItem, pagination } from '../models/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  urlMicroserviceStock: string = "http://localhost:9090/Item";
  constructor(private Http: HttpClient){ }

  createItem(data: createItem): Observable<any>{
    return this.Http.post(this.urlMicroserviceStock, data);
  }

  listItemsPaginated(data: pagination): Observable<any>{
    const params = new HttpParams()
    .set('page', data.page)
    .set('size', data.size)
    .set('sort', data.sort)
    .set('sortDirection', data.sortDirection);
    return this.Http.get(this.urlMicroserviceStock, {params});
  }
}
