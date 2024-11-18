import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { CreateUserComponent } from './create-user.component';
import { UserService } from '../../shared/services/user.service';
import { UserCreatedResponse } from '../../shared/interfaces/user';
import { handleResponse } from '../../utils/helpers/handleResponse';
import { hideToast } from '../../utils/helpers/hideToast';

jest.mock('../../utils/helpers/handleResponse');
jest.mock('../../utils/helpers/hideToast');


describe('CreateUserComponent', () => {
  let component: CreateUserComponent;
  let fixture: ComponentFixture<CreateUserComponent>;
  let userServiceMock = {
    createUserAux: jest.fn(),
  }

  let dataMock = {
    name: 'John',
    lastName: 'Doe',
    identification: '123456',
    phoneNumber: '1234567890',
    birthDate: '1990-01-01',
    email: 'test@example.com',
    password: 'password'
  }

  let formInvalidMock = {
    name: 'John',
    lastName: 'Doe',
    identification: '',
    phoneNumber: '',
    birthDate: '',
    email: '',
    password: ''
  }

  let successResponse: UserCreatedResponse =
  { message: 'Usuario creado correctamente', email: 'test@example.com' };

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [CreateUserComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: UserService, useValue: userServiceMock }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(CreateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();


  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty values and required validators', () => {
    expect(component.form).toBeDefined();
    expect(component.name.value).toBe('');
    expect(component.lastName.value).toBe('');
    expect(component.identification.value).toBe('');
    expect(component.phoneNumber.value).toBe('');
    expect(component.birthDate.value).toBe('');
    expect(component.email.value).toBe('');
    expect(component.password.value).toBe('');
    expect(component.name.hasError('required')).toBeTruthy();
  });

  it('should call createService with form data when form is valid and submitted', () => {
    component.createService = jest.fn().mockReturnValue(of(successResponse));

    component.form.setValue(dataMock);

    component.onSubmit();

    expect(component.isLoading).toBe(true);
    expect(component.createService).toHaveBeenCalledWith(dataMock);
  });

  it('should handle success response correctly', fakeAsync(() => {
    component.createService = jest.fn().mockReturnValue(of(successResponse));

    component.form.setValue(dataMock);


    component.onSubmit();
    tick();

    expect(handleResponse).toHaveBeenCalledWith(component, successResponse.message, true);
    expect(hideToast).toHaveBeenCalledWith(component.showToast);
  }));

  it('should handle error response correctly', () => {
    const errorResponse = { error: { message: 'Error creating user' } };
    component.createService = jest.fn().mockReturnValue(throwError(() => errorResponse));

    component.form.setValue(dataMock);

    component.onSubmit();

    expect(handleResponse).toHaveBeenCalledWith(component, errorResponse.error.message, false);
    expect(hideToast).toHaveBeenCalledWith(component.showToast);
  });

  it('should not call createService if form is invalid', () => {
    component.createService = jest.fn();

    component.form.setValue(formInvalidMock);

    component.onSubmit();

    expect(component.createService).not.toHaveBeenCalled();
  });
});

