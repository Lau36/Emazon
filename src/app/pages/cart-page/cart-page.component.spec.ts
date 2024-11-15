import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartPageComponent } from './cart-page.component';
import { ActivatedRoute } from '@angular/router';

describe('CartPageComponent', () => {
  let component: CartPageComponent;
  let fixture: ComponentFixture<CartPageComponent>;
  let activateRouteMock = {
    snapshot: {
      data: {
        header: jest.fn().mockReturnValue([
          {elementName: '', path:''},
        ]),
        expectedRole: jest.fn().mockReturnValue('role')
      }
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartPageComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: activateRouteMock },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
