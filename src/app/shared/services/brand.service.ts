import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createBrand} from '../models/brand';
import { Observable } from 'rxjs';
import { pagination } from '../models/pagination';
import { listAllBrandsResponse, brandCreatedResponse, brandsPaginatedResponse } from '../interfaces/brand';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  urlMicroserviceStock: string = "http://localhost:9090/brands";
  constructor(private Http: HttpClient){ }

  createBrand(data: createBrand ): Observable<brandCreatedResponse>{
    return this.Http.post<brandCreatedResponse>(this.urlMicroserviceStock, data);
  }

  listBrandsPaginated(data: pagination): Observable<brandsPaginatedResponse>{
    const params = new HttpParams()
    .set('page', data.page)
    .set('size', data.size)
    .set('sort', data.sort)
    .set('sortDirection', data.sortDirection);
    return this.Http.get<brandsPaginatedResponse>(this.urlMicroserviceStock+'/', {params});
  }

  listBrands(): Observable<listAllBrandsResponse[]>{
    return this.Http.get<listAllBrandsResponse[]>(this.urlMicroserviceStock);
  }


}
