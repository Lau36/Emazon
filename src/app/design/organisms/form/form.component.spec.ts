import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormComponent } from './form.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormComponent ],
      imports:[ReactiveFormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;

    component.form = new FormGroup({
      testField: new FormControl('')
    });

    component.formFields = [
      {
        typeField: 'input',
        content: 'Test name',
        placeholder: 'placeholder test',
        control: new FormControl(''),
        width: '23.5rem',
        height: '1rem',
        fontSize: '0.8rem',
        type: "text"
      }
    ];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit submitForm', () =>{
    jest.spyOn(component.submitForm, 'emit');
    expect(component.submitForm.emit).toHaveBeenCalled;
  });
});
