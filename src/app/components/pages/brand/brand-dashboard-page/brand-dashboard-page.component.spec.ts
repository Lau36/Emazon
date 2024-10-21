import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandDashboardPageComponent } from './brand-dashboard-page.component';

describe('BrandDashboardPageComponent', () => {
  let component: BrandDashboardPageComponent;
  let fixture: ComponentFixture<BrandDashboardPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrandDashboardPageComponent ]
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
