import { listCategories } from '../models/interfaces';
import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import { Observable } from 'rxjs';
import { createCategory } from '../models/category';
import { responseCreateCategory, responseListCategories } from '../interfaces/category';

@Injectable({
  providedIn: 'root'
})

export class CategoryService {

  urlMicroserviceStock: string = "http://localhost:9090/categories";
  constructor(private Http: HttpClient){ }

  createCategory(data: createCategory): Observable<responseCreateCategory>{
    return this.Http.post<responseCreateCategory>(this.urlMicroserviceStock, data);
  }

  listCategoriesPaginated(data: listCategories): Observable<responseListCategories>{
    const params = new HttpParams()
    .set('page', data.page)
    .set('size', data.size)
    .set('sort', data.sort)
    .set('sortDirection', data.sortDirection);
    return this.Http.get<responseListCategories>(this.urlMicroserviceStock+'/', {params});
  }

  listCategories(): Observable<responseCreateCategory[]>{
    return this.Http.get<responseCreateCategory[]>(this.urlMicroserviceStock);
  }
}
