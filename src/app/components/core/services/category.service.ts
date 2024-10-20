import { listCategories } from '../models/interfaces';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { createCategory } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})

export class CategoryService {

  urlMicroserviceStock: string = "http://localhost:9090/categories";
  constructor(private Http: HttpClient){ }

  createCategory(data: createCategory): Observable<any>{
    return this.Http.post(this.urlMicroserviceStock, data);
  }

  listCategoriesPaginated(data: listCategories): Observable<any>{
    const params = new HttpParams()
    .set('page', data.page)
    .set('size', data.size)
    .set('sort', data.sort)
    .set('sortDirection', data.sortDirection);
    return this.Http.get(this.urlMicroserviceStock+'/', {params});
  }

  listCategories(): Observable<any>{
    return this.Http.get(this.urlMicroserviceStock);
  }
}
