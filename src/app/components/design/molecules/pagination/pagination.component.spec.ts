import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
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

  it('should emit changePageSortByAction with a string when onPageSortBySelected is called', () => {
    jest.spyOn(component.changePageSortByAction, 'emit');

    component.onPageSortBySelected('name'); 

    expect(component.changePageSortByAction.emit).toHaveBeenCalledWith('name');
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

});
