import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartItemComponent } from './cart-item.component';

describe('CartItemComponent', () => {
  let component: CartItemComponent;
  let fixture: ComponentFixture<CartItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit itemId when handleRemoveItem is called', () => {
    jest.spyOn(component.removeItemAction, 'emit');
    component.handleRemoveItem(1);
    expect(component.removeItemAction.emit).toHaveBeenCalledWith(1);
  });

  it('should refactor date', () => {
    component.item = {
      id: 0,
      name: '',
      description: '',
      quantityInCart: 0,
      quantityInStock: 0,
      areStock: true,
      nextSupplyDate: '2024-12-18T11:42:23.504204',
      price: 0,
      categories: [{id: 0, name: ''}],
      brand: {id: 0, name: ''},
    };
    component.refactorDate();
    expect(component.item.nextSupplyDate).toBe('2024-12-18');
  });

});
