import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUserAuxPageComponent } from './create-user-aux-page.component';
import { UserService } from '../../shared/services/user.service';

describe('CreateUserAuxPageComponent', () => {
  let component: CreateUserAuxPageComponent;
  let fixture: ComponentFixture<CreateUserAuxPageComponent>;
  let userServiceMock = {
    createUserAux: jest.fn(),
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUserAuxPageComponent ],
      providers: [
        {provide: UserService, useValue: userServiceMock}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUserAuxPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
