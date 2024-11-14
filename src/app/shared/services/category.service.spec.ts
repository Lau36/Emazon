import {  CreateCategory} from '../models/category';
import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { CategoryService } from './category.service';
import { of, throwError } from 'rxjs';
import { stockMicroservice } from '../constants/microservicesUrl';
import { Pagination } from '../models/pagination';

const httpClientMock = {
  post: jest.fn(),
  get: jest.fn()
}

  const data:CreateCategory = {
    categoryName: "test",
    categoryDescription: "test create category service"
 }

 const responseMock: any ={
    id: 1,
    categoryName: "test",
    categoryDescription: "test create category service"
 }

 const responseListCategories = {
  categories: [{ categoryName: 'Test', categoryDescription: 'Test description' }],
  currentPage: 1,
  totalPages: 1,
  totalElements: 1
};

const responseCategories=
  [{ id: 1, categoryName: 'Test', categoryDescription: 'Test description' },
    { id: 2, categoryName: 'Test2', categoryDescription: 'Test description2' }
  ];

const params: Pagination = {
  page: 0,
  size: 5,
  sort: 'categoryName',
  sortDirection: 'asc'
};

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

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('create new category http have been called', () => {
    service.createCategory(data);
    expect(httpClientMock.post).toHaveBeenCalledWith(stockMicroservice+'/categories', data)
  });

  it('create new category return response', (done) => {
    httpClientMock.post.mockReturnValue(of(responseMock))
    service.createCategory(data).subscribe(response => {
      expect(response).toEqual(response);
      done();
    });

  });

  it('listCategoriesPaginated http have been called', () => {
    service.listCategoriesPaginated(params);
    expect(httpClientMock.get).toHaveBeenCalledWith(`${stockMicroservice}/categories/`, {
      params: expect.any(Object)
    });
  });

  it('should listCategoriesPaginated returns response', (done) => {
    httpClientMock.get.mockReturnValue(of(responseListCategories));
    service.listCategoriesPaginated(params).subscribe(response => {
      expect(response).toEqual(responseListCategories);
      done();
    });
  });

  it('should listCategoriesPaginated handles error', (done) => {
    const errorMessage = 'Error fetching categories';
    httpClientMock.get.mockReturnValue(throwError(() => new Error(errorMessage)));

    service.listCategoriesPaginated(params).subscribe({
      next: () => fail('expected an error, not categories'),
      error: (error) => {
        expect(error.message).toContain(errorMessage);
        done();
      }
    });
  });

  it('should listAllCategories', () => {
    httpClientMock.get.mockReturnValue(of(responseCategories));
    service.listCategories().subscribe(response => {
      expect(response).toEqual(responseListCategories);
    });
  });

});
