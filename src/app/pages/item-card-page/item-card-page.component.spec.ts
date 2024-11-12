import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCardPageComponent } from './item-card-page.component';
import { ActivatedRoute } from '@angular/router';

describe('ItemCardPageComponent', () => {
  let component: ItemCardPageComponent;
  let fixture: ComponentFixture<ItemCardPageComponent>;
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
      declarations: [ ItemCardPageComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: activateRouteMock },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemCardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
