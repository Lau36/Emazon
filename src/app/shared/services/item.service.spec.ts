import { TestBed } from '@angular/core/testing';

import { ItemService } from './item.service';
import { HttpClient } from '@angular/common/http';
import { createItem, itemsWithPrice } from '../models/item';
import { of, throwError } from 'rxjs';

const httpClientMock = {
  post: jest.fn(),
  get: jest.fn()
}

const data: createItem = {
  name: 'item name',
  description: 'item description',
  price: 10.99,
  amount: 10,
  idBrand: 1,
  idCategories: [1,2,3]
}

const responseListItemsPaginated = {
  items:[{
    id: 1,
    name: 'Item 1',
    description: 'decription',
    price: 10.99,
    quantityInStock: 2,
    categories:[{id:1, name:'categoryName'}],
    brand:{
      id: 1,
      name: 'brandName'
    }
  }],
  currentPage:1,
  totalPages:1,
  totalElements:1
}

const pagination = {
  page: 0,
  size: 5,
  sort: 'itemName',
  sortDirection: 'asc'
};

const mockItems: itemsWithPrice[] = [
  { id: 1, name: 'Item 1', price: 10 },
  { id: 2, name: 'Item 2', price: 15 }
];

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

  it('should listItemsPaginated returns response', (done) => {
    httpClientMock.get.mockReturnValue(of(responseListItemsPaginated));
    service.listItemsPaginated(pagination).subscribe(response => {
      expect(response).toEqual(responseListItemsPaginated);
      done();
    });
  });

  it('should listItemsPaginated handles error', (done) => {
    const errorMessage = 'Error fetching items';
    httpClientMock.get.mockReturnValue(throwError(() => new Error(errorMessage)));

    service.listItemsPaginated(pagination).subscribe({
      next: () => fail('expected an error, not items'),
      error: (error) => {
        expect(error.message).toContain(errorMessage);
        done();
      }
    });
  });

  it('should listAllItems', () => {
    httpClientMock.get.mockReturnValue(of(mockItems));
    service.listAllItems().subscribe(response => {
      expect(response).toEqual(mockItems);
    });
  });

});
