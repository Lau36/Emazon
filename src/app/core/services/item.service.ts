import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createItem, pagination } from '../models/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  urlMicroserviceStock: string = "http://localhost:9090/Item";
  token: string = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbjFAZ21haWwuY29tIiwicm9sZSI6IlJPTEVfQWRtaW4iLCJVc2VyX2lkIjoxMywiaWF0IjoxNzI4OTIwNDA5LCJleHAiOjE3Mjk1MjUyMDl9._sFV8fzB5s8DT-W51suLaEmnLa0hrHahDInZZeMUDMY";
  constructor(private Http: HttpClient){ }

  createItem(data: createItem): Observable<any>{
    const headers = new HttpHeaders().set('Authorization', 'Bearer '+ this.token);
    return this.Http.post(this.urlMicroserviceStock, data, {headers});
  }

  listItemsPaginated(data: pagination): Observable<any>{
    const headers = new HttpHeaders().set('Authorization', 'Bearer '+ this.token);
    const params = new HttpParams()
    .set('page', data.page)
    .set('size', data.size)
    .set('sort', data.sort)
    .set('sortDirection', data.sortDirection);
    return this.Http.get(this.urlMicroserviceStock, {headers, params});
  }
}
