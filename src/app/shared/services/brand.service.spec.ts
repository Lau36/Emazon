import { TestBed } from '@angular/core/testing';

import { BrandService } from './brand.service';
import { createBrand } from '../models/brand';
import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { stockMicroservice, userMicroservice } from '../constants/microservicesUrl';

const httpClientMock = {
  post: jest.fn(),
  get: jest.fn(),
}

  const data:createBrand = {
    name: "test",
    description: "test create brand service"
 }

 const responseMock: any ={
    id: 1,
    name: "test",
    description: "test create brand service"
 }

 const responseBrands=
 [{ id: 1, name: 'Test', description: 'Test description' },
   { id: 2, name: 'Test2', description: 'Test description2' }
 ];

 const responseListBrands = {
  brands: [{ id: 1, name: 'Test', description: 'Test description' }],
  currentPage: 1,
  totalPages: 1,
  totalElements: 1
};

 const params = {
  page: 0,
  size: 5,
  sort: 'name',
  sortDirection: 'asc'
};

describe('BranchService', () => {

  let service: BrandService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: httpClientMock },
      ]
    });
    service = TestBed.inject(BrandService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });


  it('create new brand http have been called', () => {
    service.createBrand(data);
    expect(httpClientMock.post).toHaveBeenCalledWith(stockMicroservice + '/brands', data);

  });

  it('create new brand return response', () => {
    httpClientMock.post.mockReturnValue(of(responseMock));
    service.createBrand(data).subscribe(response => {
      expect(response).toEqual(response);
    });

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should listBrandsPaginated returns response', (done) => {
    httpClientMock.get.mockReturnValue(of(responseListBrands));
    service.listBrandsPaginated(params).subscribe(response => {
      expect(response).toEqual(responseListBrands);
      done(); 
    });
  });

  it('should listBrandsPaginated handles error', (done) => {
    const errorMessage = 'Error fetching categories';
    httpClientMock.get.mockReturnValue(throwError(() => new Error(errorMessage)));

    service.listBrandsPaginated(params).subscribe({
      next: () => fail('expected an error, not categories'),
      error: (error) => {
        expect(error.message).toContain(errorMessage);
        done();
      }
    });
  });

  it('should listAllBrands', (done) => {
    httpClientMock.get.mockReturnValue(of(responseBrands));
    service.listBrands().subscribe(response => {
      expect(response).toEqual(responseBrands);
      done();
    });
  });
});
