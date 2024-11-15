import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartPaginationComponent } from './cart-pagination.component';

describe('CartPaginationComponent', () => {
  let component: CartPaginationComponent;
  let fixture: ComponentFixture<CartPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartPaginationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit changePageSizeAction with a number when onPageSizeSelected is called', () => {
    jest.spyOn(component.changePageSizeAction, 'emit');

    component.onPageSizeSelected('10');

    expect(component.changePageSizeAction.emit).toHaveBeenCalledWith(10);
  });

  it('should emit changePageSortDirectionAction with a number when onPageSortDirectionSelected is called', () => {
    jest.spyOn(component.changePageSortDirectionAction, 'emit');

    component.onPageSortDirectionSelected('desc');

    expect(component.changePageSortDirectionAction.emit).toHaveBeenCalledWith('desc');
  });

  it('should emit previousPageAction when previousPage is called', () => {
    jest.spyOn(component.previousPageAction, 'emit');

    component.previousPage();

    expect(component.previousPageAction.emit).toHaveBeenCalled();
  });

  it('should emit nextPageAction when nextPage is called', () => {
    jest.spyOn(component.nextPageAction, 'emit');

    component.nextPage();

    expect(component.nextPageAction.emit).toHaveBeenCalled();
  });

  it('should emit filterByBrandNameSelectedAction when onPageFilterByBrandNameSelected is called', () => {
    jest.spyOn(component.filterByBrandNameAction, 'emit');

    component.onPageFilterByBrandNameSelected('brand');

    expect(component.filterByBrandNameAction.emit).toHaveBeenCalledWith('brand');
  });

  it('should emit filterByBrandNameSelectedAction when onPageFilterByBrandNameSelected is called', () => {
    jest.spyOn(component.filterByBrandNameAction, 'emit');
    component.onPageFilterByBrandNameSelected('category');
    expect(component.filterByBrandNameAction.emit).toHaveBeenCalledWith('category');
  });

  it('should emit itemId when handleRemoveItem is called', () => {
    jest.spyOn(component.removeItemFromCartAction, 'emit');
    component.handleRemoveItem(1);
    expect(component.removeItemFromCartAction.emit).toHaveBeenCalledWith(1);;
  });
});
