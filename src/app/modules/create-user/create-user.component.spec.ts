import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { CreateUserComponent } from './create-user.component';
import { UserService } from '../../shared/services/user.service';
import { userCreatedResponse } from '../../shared/interfaces/user';
import { handleResponse } from '../../utils/helpers/handleResponse';
import { hideToast } from '../../utils/helpers/hideToast';

jest.mock('../../utils/helpers/handleResponse');
jest.mock('../../utils/helpers/hideToast');

describe('CreateUserComponent', () => {
  let component: CreateUserComponent;
  let fixture: ComponentFixture<CreateUserComponent>;
  let userServiceMock: jest.Mocked<UserService>;

  beforeEach(async () => {
    userServiceMock = {
      createUserAux: jest.fn()
    } as unknown as jest.Mocked<UserService>;

    await TestBed.configureTestingModule({
      declarations: [CreateUserComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: UserService, useValue: userServiceMock }
      ]
    }).compileComponents();
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
    const successResponse: userCreatedResponse = { message: 'User created successfully', email: 'test@example.com' };
    component.createService = jest.fn().mockReturnValue(of(successResponse));

    component.form.setValue({
      name: 'John',
      lastName: 'Doe',
      identification: '123456',
      phoneNumber: '1234567890',
      birthDate: '1990-01-01',
      email: 'test@example.com',
      password: 'password'
    });

    component.onSubmit();

    expect(component.isLoading).toBe(true);
    expect(component.createService).toHaveBeenCalledWith({
      name: 'John',
      lastName: 'Doe',
      identification: '123456',
      phoneNumber: '1234567890',
      birthDate: '1990-01-01',
      email: 'test@example.com',
      password: 'password'
    });
  });

  it('should handle success response correctly', () => {
    const successResponse: userCreatedResponse = { message: 'User created successfully', email: 'test@example.com' };
    component.createService = jest.fn().mockReturnValue(of(successResponse));

    component.form.setValue({
      name: 'John',
      lastName: 'Doe',
      identification: '123456',
      phoneNumber: '1234567890',
      birthDate: '1990-01-01',
      email: 'test@example.com',
      password: 'password'
    });

    component.onSubmit();

    expect(handleResponse).toHaveBeenCalledWith(component, 'User created successfully', true);
    expect(hideToast).toHaveBeenCalledWith(component.showToast);
    expect(component.form.valid).toBe(true);
    expect(component.isLoading).toBe(false);
  });

  it('should handle error response correctly', () => {
    const errorResponse = { error: { message: 'Error creating user' } };
    component.createService = jest.fn().mockReturnValue(throwError(errorResponse));

    component.form.setValue({
      name: 'John',
      lastName: 'Doe',
      identification: '123456',
      phoneNumber: '1234567890',
      birthDate: '1990-01-01',
      email: 'test@example.com',
      password: 'password'
    });

    component.onSubmit();

    expect(handleResponse).toHaveBeenCalledWith(component, 'Error creating user', false);
    expect(hideToast).toHaveBeenCalledWith(component.showToast);
    expect(component.isLoading).toBe(false);
  });

  it('should not call createService if form is invalid', () => {
    component.createService = jest.fn();

    component.form.setValue({
      name: '',
      lastName: 'Doe',
      identification: '123456',
      phoneNumber: '1234567890',
      birthDate: '1990-01-01',
      email: 'invalid-email',
      password: ''
    });

    component.onSubmit();

    expect(component.createService).not.toHaveBeenCalled();
  });
});

