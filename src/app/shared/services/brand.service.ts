import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createBrand} from '../models/interfaces';
import { Observable } from 'rxjs';
import { pagination } from '../models/pagination';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  urlMicroserviceStock: string = "http://localhost:9090/brands";
  constructor(private Http: HttpClient){ }

  createBrand(data: createBrand ): Observable<any>{
    return this.Http.post(this.urlMicroserviceStock, data);
  }

  listBrandsPaginated(data: pagination): Observable<any>{
    const params = new HttpParams()
    .set('page', data.page)
    .set('size', data.size)
    .set('sort', data.sort)
    .set('sortDirection', data.sortDirection);
    return this.Http.get(this.urlMicroserviceStock+'/', {params});
  }

  listBrands(): Observable<any>{
    return this.Http.get(this.urlMicroserviceStock);
  }


}
