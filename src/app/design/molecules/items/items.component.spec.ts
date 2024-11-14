import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsComponent } from './items.component';
import { AddCart } from 'src/app/shared/models/cart';

describe('ItemsComponent', () => {
  let component: ItemsComponent;
  let fixture: ComponentFixture<ItemsComponent>;

  const item = {
    id: 1,
    name: 'Item 1',
    description: 'Description 1',
    quantityInStock: 10,
    price: 100,
    categories: [{ id: 1, name: 'Category 1' }],
    brand: { id: 1, name: 'Brand 1' },
    quantity: 2
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should increase the quantity of an item', () => {
    component.increaseQuantity(item);
    expect(item.quantity).toBe(3);
  });

  it('should decrease the quantity of an item if quantity is greater than 1', () => {
    component.decreaseQuantity(item);
    expect(item.quantity).toBe(2);
  });

  it('should not decrease the quantity if quantity is 1', () => {
    const item = {
      id: 1,
      name: 'Item 1',
      description: 'Description 1',
      quantityInStock: 10,
      price: 100,
      categories: [{ id: 1, name: 'Category 1' }],
      brand: { id: 1, name: 'Brand 1' },
      quantity: 1
    };

    component.decreaseQuantity(item);
    expect(item.quantity).toBe(1);
  });

  it('should emit addItem event when addItemToCart is called', () => {
    jest.spyOn(component.addItem, 'emit');
    component.addItemToCart(item.id, item.quantity);

    expect(component.addItem.emit).toHaveBeenCalledWith({
      itemId: item.id,
      quantity: item.quantity
    });
  });
});
