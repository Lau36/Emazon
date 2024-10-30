
import {  TokenPayload } from '../../shared/models/tokenPayLoad';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../../shared/services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ROLE_ADMIN, ROLE_AUX, ROLE_CUSTOMER } from '../../shared/constants/Roles';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { auth } from '../../shared/models/auth';
import { authResponse } from '../../shared/interfaces/login';

jest.mock('jwt-decode', () => ({
  jwtDecode: jest.fn()
}));


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceMock = { auth: jest.fn() };
  let routerMock = { navigate: jest.fn() };
  let login: auth;
  let wrongLogin: auth;
  let mockResponse: authResponse;
  let mockTokenPayload: {role: string} = {role: ''} as TokenPayload;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports:[ReactiveFormsModule],
      providers: [
        {provide: AuthService, useValue: authServiceMock},
        {provide: Router, useValue: routerMock}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    login = {
      email: 'test@test.com',
      password: 'password123'
    }

    wrongLogin = {
      email: 'wrong@test.com',
      password: 'wrongpassword'
    }

    mockResponse = {
      token: 'mockToken',
    }

    mockTokenPayload = { role: ROLE_ADMIN }


  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display form validation error when the form is invalid on submit', () => {
    component.onSubmit();
    expect(authServiceMock.auth).not.toHaveBeenCalled();
    expect(component.isLoading).toBeFalsy;
  });

  it('should call AuthService and navigate on successful login', fakeAsync(() => {
    authServiceMock.auth.mockReturnValue(of(mockResponse));

    component.form.setValue(login);
    component.onSubmit();

    expect(authServiceMock.auth).toHaveBeenCalledWith(login);

    tick();
    expect(authServiceMock.auth).toHaveBeenCalledTimes(1);
    component.decodeTokenToNavigate();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/admin/categorias'])
    expect(component.isLoading).toBeFalsy();
    expect(component.mistakeOcurred).toBeFalsy();
    expect(component.showToast).toBeTruthy();

    (jwtDecode as jest.Mock).mockReturnValue(mockTokenPayload);

    tick(2000);
    expect(component.showToast).toBeFalsy();
  }));

  it('should show error message on login failure', fakeAsync(() => {
    const errorResponse = { error: { message: 'Invalid credentials' } };
    authServiceMock.auth.mockReturnValue(throwError(() => errorResponse));

    component.form.setValue(wrongLogin);
    component.onSubmit();
    tick();
    expect(component.isLoading).toBe(false);
    expect(component.mistakeOcurred).toBe(true);
    expect(component.message).toBe('Invalid credentials');

    tick(2000);
    expect(component.showToast).toBeFalsy();

  }));

  it('should navigate to admin route on admin role', () => {
    (jwtDecode as jest.Mock).mockReturnValue(mockTokenPayload);
    localStorage.setItem('token', 'adminToken');

    component.decodeTokenToNavigate();

    expect(routerMock.navigate).toHaveBeenCalledWith(['/admin/categorias']);
  });

  it('should navigate to admin route on Aux role', () => {
    const mockTokenPayloadAux = { role: ROLE_AUX } as JwtPayload;

    (jwtDecode as jest.Mock).mockReturnValue(mockTokenPayloadAux);
    localStorage.setItem('token', 'auxToken');

    component.decodeTokenToNavigate();

    expect(routerMock.navigate).toHaveBeenCalledWith(['/warehouse']);
  });

  it('should navigate to customer route on customer role', () => {
    const mockTokenPayloadCustomer = { role: ROLE_CUSTOMER } as JwtPayload
    (jwtDecode as jest.Mock).mockReturnValue(mockTokenPayloadCustomer);
    localStorage.setItem('token', 'customerToken');

    component.decodeTokenToNavigate();

    expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should reset form after successful login', () => {
    authServiceMock.auth.mockReturnValue(of(mockResponse));

    component.form.setValue(login);
    component.onSubmit();

    expect(component.form.value).toEqual({ email: null, password: null });
  });
});
