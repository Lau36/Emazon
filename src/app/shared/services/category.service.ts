import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import { Observable } from 'rxjs';
import { CreateCategory } from '../models/category';
import { CategoryCreatedresponse, CategoriesListresponse } from '../interfaces/category';
import { Pagination } from '../models/pagination';
import { stockMicroservice } from '../constants/microservicesUrl';

@Injectable({
  providedIn: 'root'
})

export class CategoryService {

  constructor(private Http: HttpClient){ }

  createCategory(data: CreateCategory): Observable<CategoryCreatedresponse>{
    return this.Http.post<CategoryCreatedresponse>(stockMicroservice+'/categories', data);
  }

  listCategoriesPaginated(data: Pagination): Observable<CategoriesListresponse>{
    const params = new HttpParams()
    .set('page', data.page)
    .set('size', data.size)
    .set('sort', data.sort)
    .set('sortDirection', data.sortDirection);
    return this.Http.get<CategoriesListresponse>(stockMicroservice+'/categories/', {params});
  }

  listCategories(): Observable<CategoryCreatedresponse[]>{
    return this.Http.get<CategoryCreatedresponse[]>(stockMicroservice+'/categories');
  }
}
