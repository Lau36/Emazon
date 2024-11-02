import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCustomerPageComponent } from './create-customer-page.component';
import { UserService } from '../../shared/services/user.service';

describe('CreateCustomerPageComponent', () => {
  let component: CreateCustomerPageComponent;
  let fixture: ComponentFixture<CreateCustomerPageComponent>;
  let userServiceMock = {
    createUserAux: jest.fn(),
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCustomerPageComponent ],
      providers: [
        {provide: UserService, useValue: userServiceMock}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCustomerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
