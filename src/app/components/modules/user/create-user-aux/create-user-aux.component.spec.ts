import { UserService } from './../../../core/services/user.service';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { CreateUserAuxComponent } from './create-user-aux.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';

describe('CreateUserAuxComponent', () => {
  let component: CreateUserAuxComponent;
  let fixture: ComponentFixture<CreateUserAuxComponent>;
  let userServiceMock: Partial<UserService>;

  beforeEach(async () => {
    userServiceMock = {
      createUserAux: jest.fn()
    }

    await TestBed.configureTestingModule({
      declarations: [ CreateUserAuxComponent ],
      imports:[ReactiveFormsModule],
      providers: [
        {provide: UserService, useValue: userServiceMock}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUserAuxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate the form fields', () => {
    const form = component.form;

    component.form.setValue({
      name: '',
      lastName: '',
      identification: '',
      birthDate: '',
      phoneNumber: '+57305393490509',
      email: 'test1',
      password: ''
    })

    expect(form.get('name')?.valid).toBeFalsy();
    expect(form.get('lastName')?.valid).toBeFalsy();
    expect(form.get('identification')?.valid).toBeFalsy();
    expect(form.get('birthDate')?.valid).toBeFalsy();
    expect(form.get('phoneNumber')?.valid).toBeFalsy();
    expect(form.get('email')?.valid).toBeFalsy();
    expect(form.get('password')?.valid).toBeFalsy();

    component.form.setValue({
      name: 'Test name',
      lastName: 'Test last name',
      identification: 1109667890,
      birthDate: '20/12/2003',
      phoneNumber: '+573053934905',
      email: 'test1@test.com',
      password: 'TestPassword'
    })

    expect(form.get('name')?.valid).toBeTruthy();
    expect(form.get('lastName')?.valid).toBeTruthy();
    expect(form.get('identification')?.valid).toBeTruthy();
    expect(form.get('birthDate')?.valid).toBeTruthy();
    expect(form.get('phoneNumber')?.valid).toBeTruthy();
    expect(form.get('email')?.valid).toBeTruthy();
    expect(form.get('password')?.valid).toBeTruthy();
  });

  it('should call createUserAux service when form is valid', () => {
    (userServiceMock.createUserAux as jest.Mock).mockReturnValue(of({}));

    component.form.setValue({
      name: 'Test name',
      lastName: 'Test last name',
      identification: 1109667890,
      birthDate: '20/12/2003',
      phoneNumber: '+573053934905',
      email: 'test1@test.com',
      password: 'TestPassword'
    })

    expect(component.form.valid).toBeTruthy();

    component.onSubmit();
    expect(userServiceMock.createUserAux).toHaveBeenCalled();

  });

  it('should not call service when form is invalid', () => {
    jest.spyOn(component, 'onSubmit')

    component.form.setValue({
      name: '',
      lastName: '',
      identification: 1109667890,
      birthDate: '20/12/2003',
      phoneNumber: '+573053934905',
      email: 'test1@test.com',
      password: 'TestPassword'
    })

    component.onSubmit();

    expect(component.isLoading).toBe(false);
    expect(userServiceMock.createUserAux).not.toHaveBeenCalled();
  });

  it('should call createUserAux method from UserService on valid submit', fakeAsync(() => {

    (userServiceMock.createUserAux as jest.Mock).mockReturnValue(of({}));

    component.form.setValue({
      name: 'Test name',
      lastName: 'Test last name',
      identification: 1109667890,
      birthDate: '20/12/2003',
      phoneNumber: '+573053934905',
      email: 'test1@test.com',
      password: 'TestPassword'
    })

    component.onSubmit();

    expect(userServiceMock.createUserAux).toHaveBeenCalledWith({
      name: 'Test name',
      lastName: 'Test last name',
      identification: 1109667890,
      birthDate: '20/12/2003',
      phoneNumber: '+573053934905',
      email: 'test1@test.com',
      password: 'TestPassword'
    });

    tick();

    expect(component.isLoading).toBeFalsy();
    expect(component.showToast).toBeTruthy();
    expect(component.mistakeOcurred).toBeFalsy();

    tick(3000),
    expect(component.showToast).toBeFalsy();
  }));

  it('should on error ocurred', fakeAsync(() => {
    const errorRespone = {error: {message: "Error ocurred"}};

    (userServiceMock.createUserAux as jest.Mock).mockReturnValue(throwError(()=>errorRespone))

    component.form.setValue({
      name: 'Test name',
      lastName: 'Test last name',
      identification: 1109667890,
      birthDate: '20/12/2003',
      phoneNumber: '+573053934905',
      email: 'test1@test.com',
      password: 'TestPassword'
    })

    component.onSubmit();

    expect(userServiceMock.createUserAux).toHaveBeenCalled();
    tick();

    expect(component.isLoading).toBeFalsy();
    expect(component.showToast).toBeTruthy();
    expect(component.mistakeOcurred).toBeTruthy();
    expect(component.message).toBe("Error ocurred");

    tick(3000),
    expect(component.showToast).toBeFalsy();
  }));
});
