import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDynamicComponent } from './form-dynamic.component';
import { FormControl } from '@angular/forms';

describe('FormDynamicComponent', () => {
  let component: FormDynamicComponent;
  let fixture: ComponentFixture<FormDynamicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormDynamicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormDynamicComponent);
    component = fixture.componentInstance;

    component.field = {
      typeField: 'input',
      content: 'content',
      control: new FormControl(),
      placeholder: 'Escriba aquí',
      width: '23.5rem',
      height: '1rem',
      fontSize: '0.8rem',
      type: "text"
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
