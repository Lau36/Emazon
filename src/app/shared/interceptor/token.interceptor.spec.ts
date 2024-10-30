import { TestBed } from '@angular/core/testing';
import { HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { TokenInterceptor } from './token.interceptor';
import { AuthService } from '../services/auth.service';

describe('TokenInterceptor', () => {
  let interceptor: TokenInterceptor;
  let authService: AuthService;
  let mockHandler: HttpHandler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TokenInterceptor,
        { provide: AuthService, useValue: { getToken: jest.fn() } }
      ]
    });

    interceptor = TestBed.inject(TokenInterceptor);
    authService = TestBed.inject(AuthService);
    mockHandler = {
      handle: jest.fn().mockReturnValue(of({} as HttpEvent<any>)),
    };
  });

  it('should not add token for login requests', () => {
    const request = new HttpRequest('GET', '/api/login');

    interceptor.intercept(request, mockHandler);

    expect(mockHandler.handle).toHaveBeenCalledWith(request);
  });

  it('should add token to the header if token exists and URL does not contain login', () => {
    const token = 'test-token';
    const request = new HttpRequest('GET', '/api/data');

    jest.spyOn(authService, 'getToken').mockReturnValue(token);

    const clonedRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    interceptor.intercept(request, mockHandler);

    expect(mockHandler.handle).toHaveBeenCalledWith(clonedRequest);
  });

  it('should not add token if token does not exists', () => {
    const request = new HttpRequest('GET', '/api/data');

    jest.spyOn(authService, 'getToken').mockReturnValue(null);

    interceptor.intercept(request, mockHandler);

    expect(mockHandler.handle).toHaveBeenCalledWith(request);
  });
});
