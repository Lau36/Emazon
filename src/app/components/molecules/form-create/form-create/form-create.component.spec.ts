import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms'; // Importar ReactiveFormsModule
import { of, throwError } from 'rxjs'; // Importar para simular respuestas
import { FormCreateComponent } from './form-create.component';
import { CategoryService } from '../../../../services/category.service';
import { ToastComponent } from '../../../atoms/toast/toast.component';

const mockCategoryService = {
  createCategory: jest.fn() // Mock de la función createCategory
};

describe('FormCreateComponent', () => {
  let component: FormCreateComponent;
  let fixture: ComponentFixture<FormCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule], // Importar ReactiveFormsModule
      declarations: [FormCreateComponent, ToastComponent], // Declarar el componente y cualquier componente hijo
      providers: [
        { provide: CategoryService, useValue: mockCategoryService } // Proveer el mock del servicio
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Detectar cambios iniciales
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty values', () => {
    expect(component.form.valid).toBeFalsy(); // El formulario debe ser inválido al principio
    expect(component.categoryName.value).toBe(''); // Valor inicial
    expect(component.categoryDescription.value).toBe(''); // Valor inicial
  });

  it('should call createCategory when form is valid', () => {
    // Mockear la respuesta del servicio
    mockCategoryService.createCategory.mockReturnValue(of({ id: 1 }));

    component.categoryName.setValue('Test Category');
    component.categoryDescription.setValue('Test Description');

    component.onSubmit(); // Llamar al método onSubmit

    expect(mockCategoryService.createCategory).toHaveBeenCalledWith({
      categoryName: 'Test Category',
      categoryDescription: 'Test Description'
    }); // Verificar que se llame al servicio con los datos correctos
  });

  it('should log error message when createCategory fails', () => {
    // Simular un error en la creación de categoría
    const consoleSpy = jest.spyOn(console, 'log'); // Espiar el método console.log
    mockCategoryService.createCategory.mockReturnValue(throwError({ error: { message: 'Error al crear categoría' } }));

    component.categoryName.setValue('Test Category');
    component.categoryDescription.setValue('Test Description');

    component.onSubmit(); // Llamar al método onSubmit

    expect(consoleSpy).toHaveBeenCalledWith('error', 'Error al crear categoría'); // Verificar que se llame a console.log con el mensaje de error
  });
});
