import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBranchComponent } from './create-brand.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { BrandService } from '../../../services/brand.service';

describe('CreateBranchComponent', () => {
  let component: CreateBranchComponent;
  let fixture: ComponentFixture<CreateBranchComponent>;
  let brandServiceMock: Partial<BrandService>;

  beforeEach(async () => {
    brandServiceMock = {
      createBrand: jest.fn().mockReturnValue({ subscribe: jest.fn() })
    }
    await TestBed.configureTestingModule({
      declarations: [ CreateBranchComponent ],
      imports:[
        ReactiveFormsModule
      ],
      providers:[
        {provide: BrandService, useValue: brandServiceMock}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form of brand with empty controls', () => {
    expect(component.form).toBeDefined();
    expect(component.form.controls['name']).toBeDefined();
    expect(component.form.controls['description']).toBeDefined();
    expect(component.form.controls['name'].value).toBe('');
    expect(component.form.controls['description'].value).toBe('');
  });

  it('should validate the form fields of create brand', () => {
    const form = component.form;
    const name = form.get('name') as FormControl;
    const description = form.get('description') as FormControl;

    name.setValue('')
    description.setValue('')

    expect(name.valid).toBeFalsy();
    expect(description.valid).toBeFalsy();

    name.setValue('Some brandName');
    description.setValue('Some brandDescription');

    expect(name.valid).toBeTruthy();
    expect(description.valid).toBeTruthy();
  });

  it('should call createbrandservice when form is valid', () => {;
    const onSubmit = jest.spyOn(component, 'onSubmit')
    component.form.get('name')?.setValue('Test Brand');
    component.form.get('description')?.setValue('Test brand description');

    component.onSubmit();
    expect(onSubmit).toHaveBeenCalled();
    expect(component.form.valid).toBeTruthy();
  });

  it('should not call service brand when form is invalid', () => {
    component.form.controls['name'].setValue('');
    component.form.controls['description'].setValue('Test brand description');

    component.onSubmit();

    expect(component.isLoading).toBe(false);
    expect(brandServiceMock.createBrand).not.toHaveBeenCalled();
  });

  it('should call createbrandmethod from BrandService on valid submit', () => {
    component.form.get('name')?.setValue('Test Brand');
    component.form.get('description')?.setValue('Test Description');

    component.onSubmit();

    expect(brandServiceMock.createBrand).toHaveBeenCalledWith({
      name: 'Test Brand',
      description: 'Test Description'
    });

  });
});
