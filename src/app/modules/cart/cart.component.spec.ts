import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartComponent } from './cart.component';
import { CartService } from '../../shared/services/cart.service';
import { of, throwError } from 'rxjs';
import { CategoryService } from '../../shared/services/category.service';
import { BrandService } from '../../shared/services/brand.service';
import { Cart } from '../../shared/models/cart';
import { BRAND_AND_CATEGORY_NAME, BRAND_NAME, CATEGORY_NAME, NONE } from '../../shared/constants/filter';

const categories = [
  'category1',
  'category2',
  'category3'
]

const brands = ['brand1', 'brand2', 'brand3'];

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let cartServiceMock: Partial<CartService>;
  let categoryServiceMock: Partial<CategoryService>;
  let brandServiceMock: Partial<BrandService>;
  let cartResponse: Cart;

  beforeEach(async () => {
    cartServiceMock = {
      removeItemFromCart: jest.fn().mockReturnValue(of([])),
      viewCart: jest.fn().mockReturnValue(of(
        {
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
      )),

    }
    categoryServiceMock = {
      listCategories: jest.fn().mockReturnValue(of(
        [
          {id: 1, categoryName: 'category1', categoryDescription: 'description1'},
          {id: 2, categoryName: 'category2', categoryDescription: 'description2'},
          {id: 3, categoryName: 'category3', categoryDescription: 'description3'}
        ]
      )),
    }
    brandServiceMock = {
      listBrands: jest.fn().mockReturnValue(of([
        {id: 1, name: 'brand1', description: 'a'},
        {id: 2, name: 'brand2', description: 'b'},
        {id: 3, name: 'brand3', description: 'c'},
      ])),
    }
    await TestBed.configureTestingModule({
      declarations: [ CartComponent ],
      providers: [
        { provide: CartService, useValue: cartServiceMock },
        { provide: CategoryService, useValue: categoryServiceMock },
        { provide: BrandService, useValue: brandServiceMock },
      ]
    })
    .compileComponents();

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
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get items in cart', () => {
    component.getCartPaginated();

    expect(component.cartResponse).toEqual(cartResponse);
    expect(component.cartResponse.items).toEqual(cartResponse.items);
    expect(component.cartResponse.totalElements).toEqual(cartResponse.totalElements);
  });

  it('should handle error when getCartPaginated fails', () => {
    (cartServiceMock.viewCart as jest.Mock).mockReturnValue(throwError(() => new Error('Error')));
    console.error = jest.fn();
    component.getCartPaginated();
    expect(console.error).toHaveBeenCalledWith("Ocurrió un error", new Error('Error'));
  });

  it('should call getAllCategories and populate categories', () => {
    expect(component.categories).toEqual(categories);
    expect(categoryServiceMock.listCategories).toHaveBeenCalledTimes(1);
    jest.clearAllMocks();
  });

  it('should get all brands', () => {
    expect(component.brands).toEqual(brands);
    expect(brandServiceMock.listBrands).toHaveBeenCalledTimes(1);
  });

  it('should update filters when category is selected', () => {
    component.selectedCategory = 'Electronics';
    component.updateFilters();
    expect(component.cartPagination.filter).toBe(CATEGORY_NAME);
    expect(component.cartPagination.filterName).toBe('Electronics');
  });

  it('should update filters when brand is selected', () => {
    component.selectedBrand = 'Brand A';
    component.updateFilters();
    expect(component.cartPagination.filter).toBe(BRAND_NAME);
    expect(component.cartPagination.filterName).toBe('Brand A');
  });

  it('should update filters when brand and category is selected', () => {
    component.selectedBrand = 'Brand A';
    component.selectedCategory = 'Electronics';
    component.updateFilters();
    expect(component.cartPagination.filter).toBe(BRAND_AND_CATEGORY_NAME);
    expect(component.cartPagination.filterName).toBe('Electronics,Brand A');
  });

  it('should update the filters to none when no filter has been selected.', () => {
    component.updateFilters();
    expect(component.cartPagination.filter).toBe(NONE);
  });

  it('should change the sort direction and reset page to 0 on sort direction change', () => {
    component.onPageSortDirectionChange('desc');
    expect(component.cartPagination.sortDirection).toBe('desc');
    expect(component.cartPagination.page).toBe(0);
  });

  it('should update the selected category and call updateFilters', () => {
    const updateFilters= jest.spyOn(component, 'updateFilters');
    component.onPageFilterByCategoryNameSelected('category1');
    expect(component.selectedCategory).toBe('category1');
    expect(updateFilters).toHaveBeenCalled();
  });

  it('should update the selected brand and call updateFilters', () => {
    const updateFilters = jest.spyOn(component, 'updateFilters');
    component.onPageFilterByBrandNameSelected('brand1');
    expect(component.selectedBrand).toBe('brand1');
    expect(updateFilters).toHaveBeenCalled();
  });

  it('should change the page size and reset page to 0 on page size change', () => {
    component.onPageSizeChange(10);
    expect(component.cartPagination.size).toBe(10);
    expect(component.cartPagination.page).toBe(0);
  });

  it('should navigate to the previous page if page > 0', () => {
    component.cartPagination.page = 1;
    component.previusPage();
    expect(component.cartPagination.page).toBe(0);
  });

  it('should navigate to the next page if currentPage < totalPages', () => {
    component.cartResponse.currentPage = 0;
    component.cartResponse.totalPages = 3;
    component.nextPage();
    expect(component.cartPagination.page).toBe(1);
  });

  it('should remove item from cart', () => {
    component.removeItemFromCart(101);

    expect(cartServiceMock.removeItemFromCart).toHaveBeenCalledTimes(1);
    expect(component.message).toBe('El articulo se eliminó del carrito exitosamente');
  });

  it('should remove item from cart fails', () => {
    const errorResponse = {
      error: {
        message: 'An error occurred'
      }
    };
    (cartServiceMock.removeItemFromCart as jest.Mock).mockReturnValue(throwError(() => errorResponse))
    component.removeItemFromCart(101);

    expect(component.mistakeOcurred).toBe(true);
    expect(component.message).toBe(errorResponse.error.message);
  });



});
