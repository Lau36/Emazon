import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserCreatedResponse } from '../interfaces/user';
import { User } from '../models/user';
import { userMicroservice } from '../constants/microservicesUrl';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private Http: HttpClient) { }

  createAuxUser(data: User): Observable<UserCreatedResponse>{
    return this.Http.post<UserCreatedResponse>(userMicroservice + '/Users', data)
  }

  createCustomerUser(data: User): Observable<UserCreatedResponse>{
    return this.Http.post<UserCreatedResponse>(userMicroservice+'/Users/Customer', data)
  }
}
