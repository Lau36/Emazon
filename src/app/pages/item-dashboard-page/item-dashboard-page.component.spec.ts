import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDashboardPageComponent } from './item-dashboard-page.component';

describe('ItemDashboardPageComponent', () => {
  let component: ItemDashboardPageComponent;
  let fixture: ComponentFixture<ItemDashboardPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemDashboardPageComponent ]
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
