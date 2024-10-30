import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {authResponse } from '../interfaces/login';
import { Observable } from 'rxjs';
import { userMicroservice } from '../constants/microservicesUrl';
import { auth } from '../models/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private Http: HttpClient) { }

  auth(data: auth): Observable<authResponse>{
    return this.Http.post<authResponse>(userMicroservice + '/Auth', data);
  }

  setToken(token: string){
    return localStorage.setItem('token', token);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  removeToken(){
    return localStorage.removeItem('token');
  }
}
