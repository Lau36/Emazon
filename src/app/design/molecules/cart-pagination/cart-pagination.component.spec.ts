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
});
