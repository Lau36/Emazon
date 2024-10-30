import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { CreateItemComponent } from './create-item.component';
import { ItemService } from "../../../shared/services/item.service";
import { CategoryService } from "../../../shared/services/category.service";
import { BrandService } from "../../../shared/services/brand.service";
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';

describe('CreateItemComponent', () => {
  let component: CreateItemComponent;
  let fixture: ComponentFixture<CreateItemComponent>;
  let mockItemService: Partial<ItemService>;
  let mockCategoryService: Partial<CategoryService>;
  let mockBrandService: Partial <BrandService>;

  beforeEach(async () => {
    mockItemService = {
      createItem: jest.fn(),
    };
    mockCategoryService = {
      listCategories: jest.fn(),
    };
    mockBrandService = {
      listBrands: jest.fn(),
    };
    await TestBed.configureTestingModule({
      declarations: [ CreateItemComponent ],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: ItemService, useValue: mockItemService },
        { provide: CategoryService, useValue: mockCategoryService },
        { provide: BrandService, useValue: mockBrandService },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateItemComponent);
    component = fixture.componentInstance;

    (mockCategoryService.listCategories as jest.Mock).mockReturnValue(of([]));
    (mockBrandService.listBrands as jest.Mock).mockReturnValue(of([]));

    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load form', () => {
    expect(component.form).toBeDefined();
    expect(component.form.get('name')).toBeDefined();
    expect(component.form.get('description')).toBeDefined();
    expect(component.form.get('price')).toBeDefined();
    expect(component.form.get('amount')).toBeDefined();
    expect(component.form.get('categories')).toBeDefined();
  });

  it('should load listCategories', () => {
    expect(mockCategoryService.listCategories).toHaveBeenCalled();
  });

  it('should log an error to the console when the service fails', () => {

    const errorResponse = new Error('Error de servicio');
    (mockCategoryService.listCategories as jest.Mock).mockReturnValue(throwError(() => errorResponse));

    const consoleSpy = jest.spyOn(console, 'log');

    component.loadCategories();

    expect(consoleSpy).toHaveBeenCalledWith('Ocurrio un error', errorResponse);

    consoleSpy.mockRestore();
  });

  it('should log an error to the console when the service fails', () => {

    const errorResponse = new Error('Error de servicio');
    (mockBrandService.listBrands as jest.Mock).mockReturnValue(throwError(() => errorResponse));

    const consoleSpy = jest.spyOn(console, 'log');

    component.loadBrands();

    expect(consoleSpy).toHaveBeenCalledWith('Ocurrio un error', errorResponse);

    consoleSpy.mockRestore();
  });

  it('should load listBrands', () => {
    expect(mockBrandService.listBrands).toHaveBeenCalled();
  });

  it('should select brand when onBrandSelected is called', () => {
    const brandId = 1;
    component.onBrandSelected(brandId);
    expect(component.selectedBrand).toBe(brandId);
  });

  it('should select categories when onCategoriesSelected is called', () => {
    const categoryId = 1;
    component.maxCategories = 3;
    component.selectedCategories = [];
    component.onCategorieSelected(categoryId);
    expect(component.selectedCategories).toContain(categoryId);
  });

  it('should set isDisabled to false for all categories when selectedCategories is less than maxCategories', () =>{

    component.selectedCategories = [1];
    component.maxCategories = 3;
    component.categories = [
      { id: 1, categoryName: 'Category 1', categoryDescription: 'Category description 2', isDisabled: true },
      { id: 2, categoryName: 'Category 1', categoryDescription: 'Category description 2', isDisabled: true }
    ];

    component.onCategorieSelected(1);

    component.categories.forEach((category: any) => {
      expect(category.isDisabled).toBe(false);
    });
  });

  it('should eliminate a category when it is unselect', () => {
    const categoryId = 1;
    component.selectedCategories = [categoryId];
    component.onCategorieSelected(categoryId);
    expect(component.selectedCategories).not.toContain(categoryId);
  });

  it('should do not add more than 3 categories', () => {
    component.maxCategories = 3;
    component.selectedCategories = [1, 2, 3];
    component.onCategorieSelected(4);
    expect(component.selectedCategories.length).toBe(3);
  });

  it('should disabled categories when the 3 categories are selected', () => {
    component.maxCategories = 3;
    component.selectedCategories = [1, 2, 3];
    component.categories = [
      {id: 1, categoryName: 'category 1', categoryDescription: 'category1', isDisabled: false},
      {id: 2, categoryName: 'category 2', categoryDescription: 'category2', isDisabled: false},
      {id: 3, categoryName: 'category 3', categoryDescription: 'category3', isDisabled: false},
      {id: 4, categoryName: 'category 4', categoryDescription: 'category4', isDisabled: false}
    ];

    component.onCategorieSelected(4);

    expect(component.categories[3].isDisabled).toBe(true);
  });

  it('should create an item', fakeAsync(() => {
    (mockItemService.createItem as jest.Mock).mockReturnValue(of({}));

    component.form.patchValue({
      name: 'Test',
      description: 'Test description',
      price: '100',
      amount: '10',
    });
    component.selectedBrand = 1;
    component.selectedCategories = [1,2];

    component.onSubmit();

    expect(mockItemService.createItem).toHaveBeenCalledWith({
      name: 'Test',
      description: 'Test description',
      price: 100,
      amount: 10,
      idBrand: 1,
      idCategories: [1,2]
    })

    tick();

    expect(component.isLoading).toBeFalsy();
    expect(component.showToast).toBeTruthy();
    expect(component.mistakeOcurred).toBeFalsy();

    tick(3000),
    expect(component.showToast).toBeFalsy();
  }));

  it('should thrown an error while item is creating', fakeAsync(() => {
    const errorRespone = {error: {message: "Error ocurred"}};
    (mockItemService.createItem as jest.Mock).mockReturnValue(throwError(() => errorRespone));

    component.form.patchValue({
      name: 'Test',
      description: 'Test description',
      price: '100',
      amount: '10',
    });
    component.selectedBrand = 1;
    component.selectedCategories = [1,2];


    component.onSubmit();

    expect(mockItemService.createItem).toHaveBeenCalled();
    tick();

    expect(component.isLoading).toBeFalsy();
    expect(component.showToast).toBeTruthy();
    expect(component.mistakeOcurred).toBeTruthy();
    expect(component.message).toBe("Error ocurred");

    tick(3000),
    expect(component.showToast).toBeFalsy();
  }));
});
