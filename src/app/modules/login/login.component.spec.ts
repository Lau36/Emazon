import { AppRoutingModule } from '../../app-routing.module';
import { TokenPayload } from '../../shared/models/tokenPayLoad';
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
import { hideToast } from '../../utils/helpers/hideToast';

jest.mock('jwt-decode', () => ({
  jwtDecode: jest.fn()
}));

jest.mock('../../utils/helpers/hideToast', () =>({
  hideToast: jest.fn()
}))


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceMock = { auth: jest.fn(), getToken: jest.fn(), setToken: jest.fn() };
  let routerMock = { navigate: jest.fn() };
  let login: auth;
  let wrongLogin: auth;
  let mockResponse: authResponse;
  let mockTokenPayloadAdmin: {role: string} = {role: ''} as TokenPayload;

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

    mockTokenPayloadAdmin = { role: ROLE_ADMIN }


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

  it('should call AuthService and navigate on successful login', () => {
    authServiceMock.auth.mockReturnValue(of(mockResponse));
    authServiceMock.getToken.mockReturnValue(mockResponse.token);

    (jwtDecode as jest.Mock).mockReturnValue(mockTokenPayloadAdmin);

    component.form.setValue(login);
    component.onSubmit();

    expect(authServiceMock.auth).toHaveBeenCalledWith(login);
    expect(authServiceMock.auth).toHaveBeenCalledTimes(1);

    expect(routerMock.navigate).toHaveBeenCalledWith(['/admin/categorias']);
    expect(routerMock.navigate).toHaveBeenCalledTimes(1);

    expect(component.isLoading).toBeFalsy();
    expect(component.mistakeOcurred).toBeFalsy();
    expect(hideToast).toHaveBeenCalledWith(true);
  });

  it('should show error message on login failure', () => {
    const errorResponse = { error: { message: 'Invalid credentials' } };
    authServiceMock.auth.mockReturnValue(throwError(() => errorResponse));

    component.form.setValue(wrongLogin);
    component.onSubmit();

    expect(component.isLoading).toBeFalsy();
    expect(component.mistakeOcurred).toBeTruthy();
    expect(component.message).toBe('Invalid credentials');

  });

  it('should navigate to admin route on admin role', () => {
    authServiceMock.setToken('token');
    authServiceMock.getToken.mockReturnValue('token');
    (jwtDecode as jest.Mock).mockReturnValue(mockTokenPayloadAdmin);

    component.decodeTokenToNavigate();

    expect(routerMock.navigate).toHaveBeenCalledWith(['/admin/categorias']);
  });

  it('should navigate to admin route on Aux role', () => {
    const mockTokenPayloadAux = { role: ROLE_AUX } as JwtPayload;

    authServiceMock.setToken('token');
    authServiceMock.getToken.mockReturnValue('token');

    (jwtDecode as jest.Mock).mockReturnValue(mockTokenPayloadAux);

    component.decodeTokenToNavigate();

    expect(routerMock.navigate).toHaveBeenCalledWith(['/aux-bodega/añadir/suministro']);
  });

  it('should navigate to customer route on customer role', () => {
    const mockTokenPayloadCustomer = { role: ROLE_CUSTOMER } as JwtPayload

    authServiceMock.setToken('token');
    authServiceMock.getToken.mockReturnValue('token');
    (jwtDecode as jest.Mock).mockReturnValue(mockTokenPayloadCustomer);

    component.decodeTokenToNavigate();

    expect(routerMock.navigate).toHaveBeenCalledWith(['/cliente/categorias']);
  });
});
