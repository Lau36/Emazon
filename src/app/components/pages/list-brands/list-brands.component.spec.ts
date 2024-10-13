import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBrandsComponent } from './list-brands.component';
import { BrandService } from '../../../services/brand.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('ListBrandsComponent', () => {
  let component: ListBrandsComponent;
  let fixture: ComponentFixture<ListBrandsComponent>;
  let brandServiceMock: Partial<BrandService>;
  let routerMock: any;

  beforeEach(async () => {
    brandServiceMock = {
      listBrandsPaginated: jest.fn().mockReturnValue(of(
        {
        brands: [{ name: 'Test', description: 'Test description' }],
        currentPage: 1,
        totalPages: 1,
        totalElements: 1
        }
      ))
    }
    routerMock = {
      navigate: jest.fn()
    }
    await TestBed.configureTestingModule({
      declarations: [ ListBrandsComponent ],
      providers:[
        {provide: BrandService, useValue: brandServiceMock},
        {provide: Router, useValue: routerMock}
      ],
      imports:[RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListBrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get brands and set responsePaginatedBrands', () => {
    component.getBrands();
    expect(component.brandList.length).toBe(1);
    expect(component.responsePaginatedBrands.currentPage).toBe(1);
    expect(component.responsePaginatedBrands.totalPages).toBe(1);
    expect(component.responsePaginatedBrands.totalElements).toBe(1);
  });

  it('should change page size', () => {
    component.onPageSizeChange(10);
    expect(component.pagination.size).toBe(10);
    expect(component.pagination.page).toBe(0);
    expect(brandServiceMock.listBrandsPaginated).toHaveBeenCalled();
  });

  it('should change page sort direction', () => {
    component.onPageSortDirectionChange('desc');
    expect(component.pagination.sortDirection).toBe('desc');
    expect(component.pagination.page).toBe(0);
    expect(brandServiceMock.listBrandsPaginated).toHaveBeenCalled();
  });

  it('should navigate to previous page', () => {
    component.pagination.page = 1;
    component.previusPage();
    expect(component.pagination.page).toBe(0);
    expect(brandServiceMock.listBrandsPaginated).toHaveBeenCalled();
  });

  it('should navigate to next page', () => {
    component.responsePaginatedBrands.totalPages = 2;
    component.pagination.page = 0;
    component.nextPage();
    expect(component.pagination.page).toBe(1);
    expect(brandServiceMock.listBrandsPaginated).toHaveBeenCalled();
  });

  it('should show modal to create brand', () => {
    const openModal = jest.spyOn(component, 'openModal');
    component.openModal();
    expect(openModal).toHaveBeenCalled();
    expect(component.isModalVisible).toBeTruthy();
  });

  it('should close modal', () => {
    const closeModal = jest.spyOn(component, 'closeModal');
    const getBrands = jest.spyOn(component, 'getBrands');
    component.closeModal();
    expect(closeModal).toHaveBeenCalled();
    expect(getBrands).toHaveBeenCalled();
    expect(component.isModalVisible).toBeFalsy();
  });


});
