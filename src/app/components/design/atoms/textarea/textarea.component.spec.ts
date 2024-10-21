import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextareaComponent } from './textarea.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

describe('TexttareaComponent', () => {
  let component: TextareaComponent;
  let fixture: ComponentFixture<TextareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextareaComponent ],
      imports:[ReactiveFormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextareaComponent);
    component = fixture.componentInstance;
    component.control = new FormControl()
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return required error message when field is empty and touched', () => {
    component.control.markAsTouched();
    component.control.setErrors({ required: true });

    const errors = component.errorMessages();
    expect(errors).toContain('Este campo es obligatorio.');
  });

  it('should return maxlength error message when field exceeds max length', () => {
    component.control.markAsTouched();
    component.control.setErrors({ maxlength: { requiredLength: 10, actualLength: 15 } });
    const errors = component.errorMessages();
    expect(errors).toContain('La longitud máxima es de 10 caracteres.');
  });

  it('should return an empty array if no errors and control is not touched', () => {
    component.control.markAsUntouched();
    component.control.setErrors(null);

    const errors = component.errorMessages();
    expect(errors.length).toBe(0);
  });

});
