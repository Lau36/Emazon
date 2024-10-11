import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createBrand } from '../models/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  urlMicroserviceStock: string = "http://localhost:9090/brands";
  token: string = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbjFAZ21haWwuY29tIiwicm9sZSI6IlJPTEVfQWRtaW4iLCJVc2VyX2lkIjoxMywiaWF0IjoxNzI4MjQzMzc2LCJleHAiOjE3Mjg4NDgxNzZ9.Y-LfFzux1lS6LhLxGxKM2HSUw1UM002-7LMMoWismrc";

  constructor(private Http: HttpClient){ }

  createBrand(data: createBrand ): Observable<any>{
    const headers = new HttpHeaders().set('Authorization', 'Bearer '+ this.token);
    return this.Http.post(this.urlMicroserviceStock, data, {headers});
  }

}
