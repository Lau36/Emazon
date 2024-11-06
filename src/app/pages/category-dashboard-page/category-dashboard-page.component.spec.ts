import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryDashboardPageComponent } from './category-dashboard-page.component';
import { ActivatedRoute } from '@angular/router';

describe('CategoryDashboardPageComponent', () => {
  let component: CategoryDashboardPageComponent;
  let fixture: ComponentFixture<CategoryDashboardPageComponent>;
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
      declarations: [ CategoryDashboardPageComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: activateRouteMock },
      ]
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
