import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { auth, authResponse } from '../models/interfaces';
import { Observable } from 'rxjs';
import { userMicroservice } from './microservicesUrl';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private Http: HttpClient) { }

  auth(data: auth): Observable<authResponse>{
    return this.Http.post<authResponse>(userMicroservice + '/Auth', data);
  }
}
