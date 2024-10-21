import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { CreateCategoryComponent } from './create-category.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CategoryService } from "../../../../core/services/category.service";
import { of, throwError } from 'rxjs';

describe.only('CreateCategoryComponent', () => {
  let component: CreateCategoryComponent;
  let fixture: ComponentFixture<CreateCategoryComponent>;
  let categoryServiceMock: Partial<CategoryService>;

  beforeEach(async () => {

    categoryServiceMock = {
      createCategory: jest.fn()
    }

    await TestBed.configureTestingModule({
      declarations: [ CreateCategoryComponent ],
      imports: [ReactiveFormsModule],
      providers:[
        {provide: CategoryService, useValue: categoryServiceMock}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty controls', () => {
    expect(component.form).toBeDefined();
    expect(component.form.controls['categoryName']).toBeDefined();
    expect(component.form.controls['categoryDescription']).toBeDefined();
    expect(component.form.controls['categoryName'].value).toBe('');
    expect(component.form.controls['categoryDescription'].value).toBe('');
  });

  it('should validate the form fields', () => {
    const form = component.form;
    const categoryName = form.get('categoryName') as FormControl;
    const categoryDescription = form.get('categoryDescription') as FormControl;

    categoryName.setValue('');
    categoryDescription.setValue('');

    expect(categoryName.valid).toBeFalsy();
    expect(categoryDescription.valid).toBeFalsy();

    categoryName.setValue('Some Category Name');
    categoryDescription.setValue('Some Category Description');

    expect(categoryName.valid).toBeTruthy();
    expect(categoryDescription.valid).toBeTruthy();
  });

  it('should call createCategory service when form is valid', () => {
    (categoryServiceMock.createCategory as jest.Mock).mockReturnValue(of({}));

    component.form.get('categoryName')?.setValue('Test category');
    component.form.get('categoryDescription')?.setValue('Test category description');

    expect(component.form.get('categoryName')?.valid).toBeTruthy();
    expect(component.form.get('categoryDescription')?.valid).toBeTruthy();
    expect(component.form.valid).toBeTruthy();

    component.onSubmit();
    expect(categoryServiceMock.createCategory).toHaveBeenCalled();

  });

  it('should not call service when form is invalid', () => {
    const onSubmit = jest.spyOn(component, 'onSubmit')
    component.form.controls['categoryName'].setValue('');
    component.form.controls['categoryDescription'].setValue('Test category description');

    component.onSubmit();

    expect(component.isLoading).toBe(false);
    expect(categoryServiceMock.createCategory).not.toHaveBeenCalled();
  });

  it('should call createCategory method from CategoryService on valid submit', fakeAsync(() => {

    (categoryServiceMock.createCategory as jest.Mock).mockReturnValue(of({}));

    component.form.get('categoryName')?.setValue('Test Category');
    component.form.get('categoryDescription')?.setValue('Test Description');

    component.onSubmit();

    expect(categoryServiceMock.createCategory).toHaveBeenCalledWith({
      categoryName: 'Test Category',
      categoryDescription: 'Test Description'
    });

    tick();

    expect(component.isLoading).toBeFalsy();
    expect(component.showToast).toBeTruthy();
    expect(component.mistakeOcurred).toBeFalsy();

    tick(3000),
    expect(component.showToast).toBeFalsy();
  }));

  it('should on error ocurred', fakeAsync(() => {
    const errorRespone = {error: {message: "Error ocurred"}};

    (categoryServiceMock.createCategory as jest.Mock).mockReturnValue(throwError(()=>errorRespone))

    component.form.get('categoryName')?.setValue('Test Category');
    component.form.get('categoryDescription')?.setValue('Test Description');

    component.onSubmit();

    expect(categoryServiceMock.createCategory).toHaveBeenCalled();
    tick();

    expect(component.isLoading).toBeFalsy();
    expect(component.showToast).toBeTruthy();
    expect(component.mistakeOcurred).toBeTruthy();
    expect(component.message).toBe("Error ocurred");

    tick(3000),
    expect(component.showToast).toBeFalsy();
  }));

});
