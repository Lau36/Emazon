import { listCategories } from './../models/interfaces';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { createCategory } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})

export class CategoryService {

  urlMicroserviceStock: string = "http://localhost:9090/categories";
  token: string = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbjFAZ21haWwuY29tIiwicm9sZSI6IlJPTEVfQWRtaW4iLCJVc2VyX2lkIjoxMywiaWF0IjoxNzI4MjQzMzc2LCJleHAiOjE3Mjg4NDgxNzZ9.Y-LfFzux1lS6LhLxGxKM2HSUw1UM002-7LMMoWismrc";
  constructor(private Http: HttpClient){ }

  createCategory(data: createCategory): Observable<any>{
    const headers = new HttpHeaders().set('Authorization', 'Bearer '+ this.token);
    return this.Http.post(this.urlMicroserviceStock, data, {headers});
  }

  listCategoriesPaginated(data: listCategories): Observable<any>{
    const headers = new HttpHeaders().set('Authorization', 'Bearer '+ this.token);
    const params = new HttpParams()
    .set('page', data.page)
    .set('size', data.size)
    .set('sort', data.sort)
    .set('sortDirection', data.sortDirection);
    return this.Http.get(this.urlMicroserviceStock+'/', {headers, params});
  }
}
