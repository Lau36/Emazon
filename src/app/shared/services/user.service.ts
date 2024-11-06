import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { userCreatedResponse } from '../interfaces/user';
import { user } from '../models/user';
import { userMicroservice } from '../constants/microservicesUrl';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private Http: HttpClient) { }

  createAuxUser(data: user): Observable<userCreatedResponse>{
    return this.Http.post<userCreatedResponse>(userMicroservice, data)
  }

  createCustomerUser(data: user): Observable<userCreatedResponse>{
    return this.Http.post<userCreatedResponse>(userMicroservice+'/Users/Customer', data)
  }
}
