import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemsComponent } from './list-items.component';
import { ItemService } from '../../../services/item.serviceee
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('ListItemsComponent', () => {
  let component: ListItemsComponent;
  let fixture: ComponentFixture<ListItemsComponent>;
  let itemServiceMock: Partial<ItemService>

  beforeEach(async () => {
    itemServiceMock = {
      listItemsPaginated: jest.fn().mockReturnValue(
        of({
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
        })
      )
    }
    await TestBed.configureTestingModule({
      declarations: [ ListItemsComponent ],
      providers: [
        {provide: ItemService, useValue: itemServiceMock}],
      imports:[RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getItems on init', () =>{
    jest.spyOn(component, 'getItems');
    component.ngOnInit();
    expect(component.getItems).toHaveBeenCalledTimes(1);
  });

  it('should get items and set responselistItems', () => {
    component.getItems();
    expect(component.items.length).toBe(1);
    expect(component.responsePaginatedItems.currentPage).toBe(1);
    expect(component.responsePaginatedItems.totalPages).toBe(1);
    expect(component.responsePaginatedItems.totalElements).toBe(1);
  });

  it('should change page size', () => {
    component.onPageSizeChange(10);
    expect(component.pagination.size).toBe(10);
    expect(component.pagination.page).toBe(0);
    expect(itemServiceMock.listItemsPaginated).toHaveBeenCalled();
  });

  it('should change page sort direction', () => {
    component.onPageSortDirectionChange('desc');
    expect(component.pagination.sortDirection).toBe('desc');
    expect(component.pagination.page).toBe(0);
    expect(itemServiceMock.listItemsPaginated).toHaveBeenCalled();
  });

  it('should change page sortBy', () => {
    component.onPageSortByChange('brandName');
    expect(component.pagination.sort).toBe('brandName');
    expect(component.pagination.page).toBe(0);
    expect(itemServiceMock.listItemsPaginated).toHaveBeenCalled();
  });

  it('should navigate to previous page', () => {
    component.pagination.page = 1;
    component.previusPage();
    expect(component.pagination.page).toBe(0);
    expect(itemServiceMock.listItemsPaginated).toHaveBeenCalled();
  });

  it('should navigate to next page', () => {
    component.responsePaginatedItems.currentPage = 0;
    component.responsePaginatedItems.totalPages = 3;
    component.pagination.page = 1;
    component.nextPage();
    expect(component.pagination.page).toBe(2);
    expect(itemServiceMock.listItemsPaginated).toHaveBeenCalled();
  });

  it('should show modal', () => {
    const openModal = jest.spyOn(component, 'openModal');
    component.openModal();
    expect(openModal).toHaveBeenCalled();
    expect(component.isModalVisible).toBeTruthy();
  });

  it('should close modal', () => {
    const closeModal = jest.spyOn(component, 'closeModal');
    const getItems = jest.spyOn(component, 'getItems');
    component.closeModal();
    expect(closeModal).toHaveBeenCalled();
    expect(getItems).toHaveBeenCalled();
    expect(component.isModalVisible).toBeFalsy();
  });
});
