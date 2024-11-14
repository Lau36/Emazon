import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { userMicroservice } from '../constants/microservicesUrl';
import { UserCreatedResponse } from '../interfaces/user';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

const httpClientMock = {
  post: jest.fn()
}

const data: User = {
  name: 'Test name',
  lastName: 'Test last name',
  identification: 1109667890,
  birthDate: '20/12/2003',
  phoneNumber: '+573053934905',
  email: 'test1@test.com',
  password: 'TestPassword'
}

const mockResponse: UserCreatedResponse = {
  message: 'User created successfully',
  email: 'test1@test.com'
}

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{provide: HttpClient, useValue: httpClientMock}]
    });
    service = TestBed.inject(UserService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('create new warehouse user http have been called', () => {
    service.createAuxUser(data);
    expect(httpClientMock.post).toHaveBeenCalledWith(userMicroservice + '/Users', data)
  });

  it('create new customer user http have been called', () => {
    service.createCustomerUser(data);
    expect(httpClientMock.post).toHaveBeenCalledWith(userMicroservice + '/Users/Customer', data)
  });

  // it('should create new customer http have been called', () => {
  //   service.createCustomerUser(data).subscribe(response => {
  //     expect(response).toEqual(mockResponse);
  //   });

  //   const req = httpMock.expectOne(userMicroservice + '/Users/Customer');
  //   expect(req.request.method).toBe('POST');
  //   expect(req.request.body).toEqual(data);

  //   req.flush(mockResponse);
  // });
});
