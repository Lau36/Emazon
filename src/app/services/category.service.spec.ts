import {  createCategory } from './../models/interfaces';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { CategoryService } from './category.service';
import { of } from 'rxjs';

const httpClientMock = {
  post: jest.fn()
}

  const data:createCategory = {
    categoryName: "test",
    categoryDescription: "test create category service"
 }

 const responseMock: any ={
    id: 1,
    categoryName: "test",
    categoryDescription: "test create category service"
 }

describe('CategoryService', () => {
  let service: CategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{
        provide: HttpClient, useValue: httpClientMock
      }]
    });
    service = TestBed.inject(CategoryService);
  });

  it('create new category http have been called', () => {
    service.createCategory(data);
    expect(httpClientMock.post).toHaveBeenCalledWith(service.urlMicroserviceStock, data, expect.any(Object))
  });

  it('create new category return response', (done) => {
    httpClientMock.post.mockReturnValue(of(responseMock)) //return an observable
    service.createCategory(data).subscribe(response => {
      expect(response).toEqual(response);
      done();
    });

  });

});
