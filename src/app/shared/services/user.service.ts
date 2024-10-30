import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { userAux } from '../models/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  urlMicroserviceUser: string = "http://localhost:8080/Users"

  constructor(private Http: HttpClient) { }

  createUserAux(data: userAux): Observable<any>{
    return this.Http.post(this.urlMicroserviceUser, data)
  }
}
