import { TokenPayload } from '../models/interfaces';
import { TestBed } from '@angular/core/testing';

import { RoleGuard } from './role.guard';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ROLE_ADMIN, ROLE_CUSTOMER } from '../constants/Roles';
import  {jwtDecode } from 'jwt-decode';

jest.mock('jwt-decode', () => ({
  jwtDecode: jest.fn()
}));

describe('RoleGuard', () => {
  let guard: RoleGuard;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let mockRouterStateSnapshot: RouterStateSnapshot;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoleGuard]
    });
    guard = TestBed.inject(RoleGuard);

    mockActivatedRouteSnapshot = {
      data: { expectedRole: ROLE_ADMIN },
      params: {},
      queryParams: {},
      fragment: null,
      url: [],
      toString: jest.fn()
    } as unknown as ActivatedRouteSnapshot;

    mockRouterStateSnapshot= {} as RouterStateSnapshot;
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true if the userRole is correct', () => {
    localStorage.setItem('token', 'test-token')

    const tokenPayload = {role: ROLE_ADMIN};
    (jwtDecode as jest.Mock).mockReturnValue(tokenPayload)

    const result = guard.canActivate(mockActivatedRouteSnapshot, mockRouterStateSnapshot);
    expect(result).toBeTruthy
  });

  it('should return true if the userRole is incorrect', () => {
    localStorage.setItem('token', 'test-token')

    const tokenPayload = {role: ROLE_CUSTOMER};
    (jwtDecode as jest.Mock).mockReturnValue(tokenPayload)

    const result = guard.canActivate(mockActivatedRouteSnapshot, mockRouterStateSnapshot);
    expect(result).toBeFalsy
  });

  it('should return false when token is not found', () => {
    localStorage.getItem('token')
    const result = guard.canActivate(mockActivatedRouteSnapshot, mockRouterStateSnapshot);
    expect(result).toBeFalsy
  });
});
