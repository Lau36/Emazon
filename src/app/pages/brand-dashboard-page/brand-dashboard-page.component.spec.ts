import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandDashboardPageComponent } from './brand-dashboard-page.component';
import { ActivatedRoute } from '@angular/router';

describe('BrandDashboardPageComponent', () => {
  let component: BrandDashboardPageComponent;
  let fixture: ComponentFixture<BrandDashboardPageComponent>;
  let activateRouteMock = {
    snapshot: {
      data: {
        header: jest.fn().mockReturnValue([
          {elementName: '', path:''},
        ]),
        expectedRole: jest.fn().mockReturnValue('role')
      }
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrandDashboardPageComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: activateRouteMock },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandDashboardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
