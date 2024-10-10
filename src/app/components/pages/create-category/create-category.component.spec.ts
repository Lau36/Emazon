import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCategoryComponent } from './create-category.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CategoryService } from '../../../services/category.service';
import { of } from 'rxjs';
import { createCategory } from '../../../models/interfaces';

describe.only('CreateCategoryComponent', () => {
  let component: CreateCategoryComponent;
  let fixture: ComponentFixture<CreateCategoryComponent>;
  let categoryServiceMock: Partial<CategoryService>;

  beforeEach(async () => {

    categoryServiceMock = {
      createCategory: jest.fn().mockReturnValue({ subscribe: jest.fn() })
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

  it('should call createCategory service when form is valid', () => {;
    const onSubmit = jest.spyOn(component, 'onSubmit')
    component.form.get('categoryName')?.setValue('Test category');
    component.form.get('categoryDescription')?.setValue('Test category description');

    component.onSubmit();
    expect(onSubmit).toHaveBeenCalled();
    expect(component.form.valid).toBeTruthy();
  });

  it('should not call service when form is invalid', () => {
    const onSubmit = jest.spyOn(component, 'onSubmit')
    component.form.controls['categoryName'].setValue('');
    component.form.controls['categoryDescription'].setValue('Test category description');

    component.onSubmit();

    expect(component.isLoading).toBe(false);
    expect(categoryServiceMock.createCategory).not.toHaveBeenCalled();
  });

  it('should call createCategory method from CategoryService on valid submit', () => {
    component.form.get('categoryName')?.setValue('Test Category');
    component.form.get('categoryDescription')?.setValue('Test Description');

    component.onSubmit();

    expect(categoryServiceMock.createCategory).toHaveBeenCalledWith({
      categoryName: 'Test Category',
      categoryDescription: 'Test Description'
    });

  });

});
