import { TestBed } from '@angular/core/testing';

import { BrandService } from './brand.service';
import { createBrand } from '../models/interfaces';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';

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
    categoryName: "test",
    categoryDescription: "test create category service"
 }

 const responseBrands=
 [{ id: 1, name: 'Test', description: 'Test description' },
   { id: 2, name: 'Test2', description: 'Test description2' }
 ];;

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


  it('create new category http have been called', () => {
    service.createBrand(data);
    expect(httpClientMock.post).toHaveBeenCalledWith(service.urlMicroserviceStock, data, expect.any(Object))
  });

  it('create new category return response', () => {
    httpClientMock.post.mockReturnValue(of(responseMock));
    service.createBrand(data).subscribe(response => {
      expect(response).toEqual(response);
    });

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should listAllBrands', (done) => {
    httpClientMock.get.mockReturnValue(of(responseBrands));
    service.listBrands().subscribe(response => {
      expect(response).toEqual(responseBrands);
      done();
    });
  });
});
