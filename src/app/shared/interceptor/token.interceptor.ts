import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { getToken } from '../../utils/getToken';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if(request.url.includes('login')){
      return next.handle(request);
    }

    const token = getToken();

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
