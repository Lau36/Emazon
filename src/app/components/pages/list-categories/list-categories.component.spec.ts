import { CategoryService } from './../../../services/category.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCategoriesComponent } from './list-categories.component';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('ListCategoriesComponent', () => {
  let component: ListCategoriesComponent;
  let fixture: ComponentFixture<ListCategoriesComponent>;
  let categoryServiceMock: Partial<CategoryService>;
  let routerMock: any;

  beforeEach(async () => {
    categoryServiceMock = {
      listCategoriesPaginated: jest.fn().mockReturnValue(of(
        {
        categories: [{ categoryName: 'Test', categoryDescription: 'Test description' }],
        currentPage: 1,
        totalPages: 1,
        totalElements: 1
        }))
    }

    routerMock = {
      navigate: jest.fn()
    }

    await TestBed.configureTestingModule({
      declarations: [ ListCategoriesComponent ],
      providers: [
        {provide: CategoryService, useValue: categoryServiceMock},
        {provide: Router, useValue: routerMock}
      ],
      imports:[
        RouterTestingModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getCategories on init', () =>{
    jest.spyOn(component, 'getCategories');
    component.ngOnInit();
    expect(component.getCategories).toHaveBeenCalledTimes(1);
  });

  it('should get categories and set responseListCategories', () => {
    component.getCategories();
    expect(component.categoriesList.length).toBe(1);
    expect(component.responseListCategories.currentPage).toBe(1);
    expect(component.responseListCategories.totalPages).toBe(1);
    expect(component.responseListCategories.totalElements).toBe(1);
  });

  it('should change page size', () => {
    component.onPageSizeChange(10);
    expect(component.listCategories.size).toBe(10);
    expect(component.listCategories.page).toBe(0);
    expect(categoryServiceMock.listCategoriesPaginated).toHaveBeenCalled();
  });

  it('should change page sort direction', () => {
    component.onPageSortDirectionChange('desc');
    expect(component.listCategories.sortDirection).toBe('desc');
    expect(component.listCategories.page).toBe(0);
    expect(categoryServiceMock.listCategoriesPaginated).toHaveBeenCalled();
  });

  it('should navigate to previous page', () => {
    component.listCategories.page = 1;
    component.previusPage();
    expect(component.listCategories.page).toBe(0);
    expect(categoryServiceMock.listCategoriesPaginated).toHaveBeenCalled();
  });

  it('should show modal', () => {
    const openModal = jest.spyOn(component, 'openModal');
    component.openModal();
    expect(openModal).toHaveBeenCalled();
    expect(component.isModalVisible).toBeTruthy();
  });

  it('should close modal', () => {
    const closeModal = jest.spyOn(component, 'closeModal');
    const getCategories = jest.spyOn(component, 'getCategories');
    component.closeModal();
    expect(closeModal).toHaveBeenCalled();
    expect(getCategories).toHaveBeenCalled();
    expect(component.isModalVisible).toBeFalsy();
  });


});
