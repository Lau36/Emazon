import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSuppliesComponent } from './add-supplies.component';

describe('AddSuppliesComponent', () => {
  let component: AddSuppliesComponent;
  let fixture: ComponentFixture<AddSuppliesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSuppliesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSuppliesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
