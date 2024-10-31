import { TestBed } from '@angular/core/testing';

import { SupplyService } from './supply.service';
import { addSupply } from '../models/supply';
import { supplyAddedResponse } from '../interfaces/supply';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { transactionMicroservice } from '../constants/microservicesUrl';

const mockData: addSupply = {
  itemId: 1,
  quantity: 10
};

const mockResponse: supplyAddedResponse = {
  message: 'Supply added successfully',
  id: 1
};


describe('SupplyService', () => {
  let service: SupplyService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SupplyService]
    });
    service = TestBed.inject(SupplyService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create new brand http have been called', () => {
    service.addSupply(mockData).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(transactionMicroservice + '/Supplies');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockData);

    req.flush(mockResponse);
  });
});
