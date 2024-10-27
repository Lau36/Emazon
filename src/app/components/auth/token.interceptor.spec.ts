import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
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

    httpRequest.flush(dummyData);
  });
});
