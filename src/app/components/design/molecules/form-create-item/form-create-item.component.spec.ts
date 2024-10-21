import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCreateItemComponent } from './form-create-item.component';

describe('FormCreateItemComponent', () => {
  let component: FormCreateItemComponent;
  let fixture: ComponentFixture<FormCreateItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCreateItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCreateItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit submitForm', () =>{
    jest.spyOn(component.submitForm, 'emit');
    expect(component.submitForm.emit).toHaveBeenCalled;
  });

  it('should emit brandSelected', () =>{
    jest.spyOn(component.brandSelected, 'emit');
    component.onBrandChange(2)
    expect(component.brandSelected.emit).toHaveBeenCalledWith(2);
  });

  it('should emit toggleCategorySelectionAction', () =>{
    jest.spyOn(component.toggleCategorySelectionAction, 'emit');
    component.toggleCategorySelection(2)
    expect(component.toggleCategorySelectionAction.emit).toHaveBeenCalledWith(2);
  });
});
