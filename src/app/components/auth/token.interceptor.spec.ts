import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HTTP_INTERCEPTORS, HttpRequest } from '@angular/common/http';
import { TokenInterceptor } from './token.interceptor';

describe('TokenInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptor,
          multi: true
        }
      ]
    });

    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should add an Authorization header for all request', () => {
    const dummyData = { message: 'test' };

    httpClient.get('/test-endpoint').subscribe(response => {
      expect(response).toEqual(dummyData);
    });

    const httpRequest = httpMock.expectOne('/test-endpoint');
    expect(httpRequest.request.headers.has('Authorization')).toBeTruthy();
    expect(httpRequest.request.headers.get('Authorization')).toBe(
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbjFAZ21haWwuY29tIiwicm9sZSI6IlJPTEVfQWRtaW4iLCJVc2VyX2lkIjoxMywiaWF0IjoxNzI4OTIwNDA5LCJleHAiOjE3Mjk1MjUyMDl9._sFV8fzB5s8DT-W51suLaEmnLa0hrHahDInZZeMUDMY'
    );

    httpRequest.flush(dummyData);
  });
});
