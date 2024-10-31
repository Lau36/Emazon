import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { transactionMicroservice } from '../constants/microservicesUrl';
import { addSupply } from '../models/supply';
import { supplyAddedResponse } from '../interfaces/supply';

@Injectable({
  providedIn: 'root'
})
export class SupplyService {

  constructor(private Http: HttpClient) { }

  addSupply(data: addSupply): Observable<supplyAddedResponse>{
    return this.Http.post<supplyAddedResponse>(transactionMicroservice + '/Supplies', data);
  }

}
