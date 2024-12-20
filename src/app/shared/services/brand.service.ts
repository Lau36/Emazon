import { HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateBrand} from '../models/brand';
import { Observable } from 'rxjs';
import { Pagination } from '../models/pagination';
import { ListAllBrandsResponse, BrandCreatedResponse, BrandsPaginatedResponse } from '../interfaces/brand';
import { stockMicroservice } from '../constants/microservicesUrl';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  constructor(private Http: HttpClient){ }

  createBrand(data: CreateBrand ): Observable<BrandCreatedResponse>{
    return this.Http.post<BrandCreatedResponse>(stockMicroservice+'/brands', data);
  }

  listBrandsPaginated(data: Pagination): Observable<BrandsPaginatedResponse>{
    const params = new HttpParams()
    .set('page', data.page)
    .set('size', data.size)
    .set('sort', data.sort)
    .set('sortDirection', data.sortDirection);
    return this.Http.get<BrandsPaginatedResponse>(stockMicroservice+'/brands/', {params});
  }

  listBrands(): Observable<ListAllBrandsResponse[]>{
    return this.Http.get<ListAllBrandsResponse[]>(stockMicroservice+'/brands');
  }


}
