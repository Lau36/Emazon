import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import { Observable } from 'rxjs';
import { createCategory } from '../models/category';
import { categoryCreatedresponse, categoriesListresponse } from '../interfaces/category';
import { pagination } from '../models/pagination';

@Injectable({
  providedIn: 'root'
})

export class CategoryService {

  urlMicroserviceStock: string = "http://localhost:9090/categories";
  constructor(private Http: HttpClient){ }

  createCategory(data: createCategory): Observable<categoryCreatedresponse>{
    return this.Http.post<categoryCreatedresponse>(this.urlMicroserviceStock, data);
  }

  listCategoriesPaginated(data: pagination): Observable<categoriesListresponse>{
    const params = new HttpParams()
    .set('page', data.page)
    .set('size', data.size)
    .set('sort', data.sort)
    .set('sortDirection', data.sortDirection);
    return this.Http.get<categoriesListresponse>(this.urlMicroserviceStock+'/', {params});
  }

  listCategories(): Observable<categoryCreatedresponse[]>{
    return this.Http.get<categoryCreatedresponse[]>(this.urlMicroserviceStock);
  }
}
