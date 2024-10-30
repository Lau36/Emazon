import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryDashboardPageComponent } from './category-dashboard-page.component';

describe('CategoryDashboardPageComponent', () => {
  let component: CategoryDashboardPageComponent;
  let fixture: ComponentFixture<CategoryDashboardPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryDashboardPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryDashboardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
