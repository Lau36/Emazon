import { removeToken } from 'src/app/utils/removeToken';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../../shared/services/auth.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router: Router;
  let authServiceMock = { removeToken: jest.fn() };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [RouterTestingModule],
      providers: [
        { provide: AuthService, useValue: authServiceMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to login on logout and call removeToken', () => {
    const navigateSpy = jest.spyOn(router, 'navigate');
    component.logout();
    expect(authServiceMock.removeToken).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(['login']);
  });

  it('should have input listElementsNav', () => {
    component.listElementsNav = [
      { elementName: 'Home', path: '/home' },
      { elementName: 'About', path: '/about' }
    ];
    fixture.detectChanges();
    expect(component.listElementsNav.length).toBe(2);
    expect(component.listElementsNav[0].elementName).toBe('Home');
  });
});
