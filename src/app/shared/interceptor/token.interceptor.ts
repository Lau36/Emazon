import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if(request.url.includes('login')){
      return next.handle(request);
    }

    const token = this.authService.getToken();

    if(token){
      const newReq = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        },
      })
      return next.handle(newReq);
    }

    return next.handle(request);

  }
}
