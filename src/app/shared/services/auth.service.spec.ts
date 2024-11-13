import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { auth } from '../models/auth';
import { authResponse } from '../interfaces/login';

const httpClientMock = {
  post: jest.fn()
}

describe('AuthService', () => {
  let service: AuthService;
  let data: auth;
  let authResponse: authResponse;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: httpClientMock }
      ]
    });
    service = TestBed.inject(AuthService);

    data = {
      email: 'test@gmail.com',
      password: '123456'
    }

    authResponse = {
      token: 'test-token'
    }

  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should successful login', (done) => {
    const auth = jest.spyOn(service, 'auth')
    httpClientMock.post.mockReturnValue(of(authResponse));
    service.auth(data).subscribe((response) => {
      expect(response).toEqual(authResponse);
      expect(auth).toHaveBeenCalledTimes(1);
      done();
    })
  });

  it('should throw an error', (done) => {
    const errorResponse = {message: 'error'}
    httpClientMock.post.mockReturnValue(throwError(() => errorResponse))

    service.auth(data).subscribe({
      next: () => fail(),
      error: (error) =>{
        expect(error).toEqual(errorResponse);
        done();
      }
    })
  })

});
