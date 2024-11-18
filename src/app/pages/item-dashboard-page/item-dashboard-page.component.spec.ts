import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDashboardPageComponent } from './item-dashboard-page.component';
import { ActivatedRoute } from '@angular/router';

describe('ItemDashboardPageComponent', () => {
  let component: ItemDashboardPageComponent;
  let fixture: ComponentFixture<ItemDashboardPageComponent>;
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
      declarations: [ ItemDashboardPageComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: activateRouteMock },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemDashboardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
