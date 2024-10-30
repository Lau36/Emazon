import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { userCreatedResponse } from '../interfaces/user';
import { user } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  urlMicroserviceUser: string = "http://localhost:8080/Users"

  constructor(private Http: HttpClient) { }

  createUserAux(data: user): Observable<userCreatedResponse>{
    return this.Http.post<userCreatedResponse>(this.urlMicroserviceUser, data)
  }
}
