import { fakeAsync, TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let routerMock = { navigate: jest.fn().mockResolvedValue(true) };

  const mockActivatedRouteSnapshot: ActivatedRouteSnapshot = {} as ActivatedRouteSnapshot;
  const mockRouterStateSnapshot: RouterStateSnapshot = {} as RouterStateSnapshot;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard, { provide: Router, useValue: routerMock }]
    });
    guard = TestBed.inject(AuthGuard);
  });

  afterEach(() => {
    localStorage.clear();
  });


  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should redirect to login if token is not found', async () => {
    localStorage.removeItem('token');
    const result = await guard.canActivate(mockActivatedRouteSnapshot, mockRouterStateSnapshot);
    expect(routerMock.navigate).toHaveBeenLastCalledWith(['/login']);
    expect(result).toBe(false);
  })

  it('should return true if token exists', () => {
    localStorage.setItem('token', 'token');
    const result = guard.canActivate(mockActivatedRouteSnapshot, mockRouterStateSnapshot);
    expect(result).toBe(true);
  })
});
