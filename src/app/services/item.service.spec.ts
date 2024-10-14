import { TestBed } from '@angular/core/testing';

import { ItemService } from './item.service';
import { HttpClient } from '@angular/common/http';
import { createItem } from '../models/interfaces';
import { of, throwError } from 'rxjs';

const httpClientMock = {
  post: jest.fn()
}

const data: createItem = {
  name: 'item name',
  description: 'item description',
  price: 10.99,
  amount: 10,
  idBrand: 1,
  idCategories: [1,2,3]
}

describe('ItemService', () => {

  let service: ItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{
        provide: HttpClient, useValue: httpClientMock
      }]
    });
    service = TestBed.inject(ItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('create new item http have been called', () => {
    const responseMessage = {message: 'El artículo se creó exitosamente'}
    httpClientMock.post.mockReturnValue(of(responseMessage));

    service.createItem(data).subscribe((response) => {
      expect(response).toEqual(responseMessage)
      expect(httpClientMock.post).toHaveBeenCalledTimes(1);
    }) ;
  });


  it('should create item handles error', () => {
    const errorRespone = {error: {message: "Error ocurred"}};
    httpClientMock.post.mockReturnValue(throwError(() => errorRespone));

    service.createItem(data).subscribe({
      next: () => {
        fail('should not be called');
      },
      error: (error) => {
        expect(error).toEqual(errorRespone);
      }
    })
  });


});
