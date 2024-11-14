import { TestBed } from '@angular/core/testing';

import { CartService } from './cart.service';
import { HttpClient } from '@angular/common/http';
import { AddCart } from '../models/cart';
import { cartMicroservice } from '../constants/microservicesUrl';
import { addItemToCartResponse} from '../interfaces/cart';
import { of } from 'rxjs';

describe('CartService', () => {
  let service: CartService;

  const httpClientMock = {
    post: jest.fn()
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

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
