import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { transactionMicroservice } from '../constants/microservicesUrl';
import { AddSupply } from '../models/supply';
import { SupplyAddedResponse } from '../interfaces/supply';

@Injectable({
  providedIn: 'root'
})
export class SupplyService {

  constructor(private Http: HttpClient) { }

  addSupply(data: AddSupply): Observable<SupplyAddedResponse>{
    return this.Http.post<SupplyAddedResponse>(transactionMicroservice + '/Supplies', data);
  }

}
