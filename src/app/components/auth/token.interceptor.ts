import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const newReq = request.clone({
      setHeaders: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbjFAZ21haWwuY29tIiwicm9sZSI6IlJPTEVfQWRtaW4iLCJVc2VyX2lkIjoxMywiaWF0IjoxNzI5NTQ0OTIxLCJleHAiOjE3MzAxNDk3MjF9.EIDTWG4Tjc8eUEBMSMSCoDjDwQXUhQTkTexnQzYhh2k'
      },
    })
    return next.handle(newReq);
  }
}
