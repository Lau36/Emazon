import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { CreateBrandComponent } from './create-brand.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { BrandService } from '../../../shared/services/brand.service';
import { of, throwError } from 'rxjs';

describe('CreateBranchComponent', () => {
  let component: CreateBrandComponent;
  let fixture: ComponentFixture<CreateBrandComponent>;
  let brandServiceMock: Partial<BrandService>;

  beforeEach(async () => {
    brandServiceMock = {
      createBrand: jest.fn()
    }
    await TestBed.configureTestingModule({
      declarations: [ CreateBrandComponent ],
      imports:[
        ReactiveFormsModule
      ],
      providers:[
        {provide: BrandService, useValue: brandServiceMock}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateBrandComponent);
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
    (brandServiceMock.createBrand as jest.Mock).mockReturnValue(of({}));

    component.form.get('name')?.setValue('Test Brand');
    component.form.get('description')?.setValue('Test brand description');

    expect(component.form.get('name')?.valid).toBeTruthy();
    expect(component.form.get('description')?.valid).toBeTruthy();

    component.onSubmit();
    expect(brandServiceMock.createBrand).toHaveBeenCalled();

  });

  it('should not call service brand when form is invalid', () => {
    component.form.controls['name'].setValue('');
    component.form.controls['description'].setValue('Test brand description');

    component.onSubmit();

    expect(component.isLoading).toBe(false);
    expect(brandServiceMock.createBrand).not.toHaveBeenCalled();
  });

  it('should call createbrandmethod from BrandService on valid submit', fakeAsync(() => {
    (brandServiceMock.createBrand as jest.Mock).mockReturnValue(of({}));
    component.form.get('name')?.setValue('Test Brand');
    component.form.get('description')?.setValue('Test Description');

    component.onSubmit();

    expect(brandServiceMock.createBrand).toHaveBeenCalledWith({
      name: 'Test Brand',
      description: 'Test Description'
    });

    tick();
    expect(component.isLoading).toBeFalsy();
    expect(component.showToast).toBeTruthy();
    expect(component.mistakeOcurred).toBeFalsy();

    tick(3000);
    expect(component.showToast).toBeFalsy();

  }));

  it('should on error ocurred', fakeAsync(() => {
    const errorRespone = {error: {message: "Error ocurred"}};

    (brandServiceMock.createBrand as jest.Mock).mockReturnValue(throwError(()=>errorRespone))

    component.form.get('name')?.setValue('Test Category');
    component.form.get('description')?.setValue('Test Description');

    component.onSubmit();

    expect(brandServiceMock.createBrand).toHaveBeenCalled();
    tick();

    expect(component.isLoading).toBeFalsy();
    expect(component.showToast).toBeTruthy();
    expect(component.mistakeOcurred).toBeTruthy();
    expect(component.message).toBe("Error ocurred");

    tick(3000),
    expect(component.showToast).toBeFalsy();
  }));

});
