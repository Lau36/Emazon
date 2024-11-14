import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AuthResponse } from '../interfaces/login';
import { Observable } from 'rxjs';
import { userMicroservice } from '../constants/microservicesUrl';
import { Auth } from '../models/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private Http: HttpClient) { }

  auth(data: Auth): Observable<AuthResponse>{
    return this.Http.post<AuthResponse>(userMicroservice + '/Auth', data);
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
