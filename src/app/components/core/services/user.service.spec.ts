import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { userAux } from '../models/interfaces';
import { HttpClient } from '@angular/common/http';

const httpClientMock = {
  post: jest.fn()
}

const data: userAux = {
  name: 'Test name',
  lastName: 'Test last name',
  identification: 1109667890,
  birthDate: '20/12/2003',
  phoneNumber: '+573053934905',
  email: 'test1@test.com',
  password: 'TestPassword'
}

describe('UserService', () => {
  let service: UserService;


  beforeEach(() => {
    TestBed.configureTestingModule({
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

  it('create new brand http have been called', () => {
    service.createUserAux(data);
    expect(httpClientMock.post).toHaveBeenCalledWith(service.urlMicroserviceUser, data)
  });
});
