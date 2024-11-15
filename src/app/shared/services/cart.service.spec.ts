import { TestBed } from '@angular/core/testing';

import { CartService } from './cart.service';
import { HttpClient } from '@angular/common/http';
import { AddCart, Cart } from '../models/cart';
import { addItemToCartResponse} from '../interfaces/cart';
import { of } from 'rxjs';
import { CartPagination } from '../models/pagination';

describe('CartService', () => {
  let service: CartService;
  let cartResponse: Cart;
  let params: CartPagination;


  const httpClientMock = {
    post: jest.fn(),
    get: jest.fn()
  }

  const data: AddCart = {
    itemId: 1,
    quantity: 1
  }

  const addItemToCartResponse: addItemToCartResponse = {
    id: 9,
    userId: 33,
    itemId: 6,
    quantity: 4,
    updatedAt: "2024-11-11T19:54:20.8258659",
    status: "STANDBY",
    deleted: false
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: httpClientMock },
      ]
    });
    service = TestBed.inject(CartService);

    cartResponse = {
      items: [{
        id: 101,
        name: "Laptop X100",
        description: "A high-performance laptop suitable for gaming and professional work.",
        quantityInCart: 2,
        quantityInStock: 10,
        areStock: true,
        nextSupplyDate: "2024-12-01",
        price: 1200.00,
        categories: [
          {
            id: 1,
            name: "Electronics"
          },
          {
            id: 2,
            name: "Computers"
          }
        ],
        brand: {
          id: 5,
          name: "TechBrand"
        }
      }],
      totalPrice: 100,
      currentPage: 1,
      totalPages: 3,
      totalElements: 10
    }

    params = {
      page: 0,
      size: 5,
      sort: 'name',
      sortDirection: 'asc',
      filter: 'categoryName',
      filterName: 'category'
    };

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('add item to cart service', () => {
    httpClientMock.post.mockReturnValue(of(addItemToCartResponse));
    service.addItemToCart(data).subscribe(
      (response) => {
        expect(httpClientMock.post).toHaveBeenCalledTimes(1);
        expect(response).toEqual(addItemToCartResponse)
      }
    );
  });

  it('should list items in cart', () => {
    httpClientMock.get.mockReturnValue(of(cartResponse));
    service.viewCart(params).subscribe(
      (response) => {
        expect(httpClientMock.get).toHaveBeenCalledTimes(1);
        expect(response).toEqual(cartResponse);
      }
    )
  });
});
