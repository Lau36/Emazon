import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSuppliesPageComponent } from './add-supplies-page.component';

describe('AddSuppliesPageComponent', () => {
  let component: AddSuppliesPageComponent;
  let fixture: ComponentFixture<AddSuppliesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSuppliesPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSuppliesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
