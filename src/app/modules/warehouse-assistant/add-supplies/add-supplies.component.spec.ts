import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSuppliesComponent } from './add-supplies.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SupplyService } from '../../../shared/services/supply.service';
import { AddSupply } from '../../../shared/models/supply';
import { ItemsWithPrice } from '../../../shared/models/item';
import { ItemService } from '../../../shared/services/item.service';
import { of, throwError } from 'rxjs';
import { handleResponse } from '../../../utils/helpers/handleResponse';

jest.mock('../../../utils/helpers/handleResponse.ts', () => ({
  handleResponse: jest.fn()
}));

jest.mock('../../../utils/helpers/hideToast.ts', () =>({
  hideToast: jest.fn()
}));

describe('AddSuppliesComponent', () => {
  let component: AddSuppliesComponent;
  let fixture: ComponentFixture<AddSuppliesComponent>;
  let supplyServiceMock = {
    addSupply: jest.fn(),
  }
  let itemServiceMock = {
    listAllItems: jest.fn()
  }


  const mockSupply: AddSupply = {itemId: 1, quantity: 2};
  const mockItems: ItemsWithPrice[] = [{ id: 1, name: 'Item 1', price: 200 }, { id: 2, name: 'Item 2' , price: 300}];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSuppliesComponent ],
      imports:[ReactiveFormsModule],
      providers: [
        {provide: SupplyService, useValue: supplyServiceMock},
        { provide: ItemService, useValue: itemServiceMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSuppliesComponent);
    component = fixture.componentInstance;

    itemServiceMock.listAllItems.mockReturnValue(of(mockItems));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with required controls', () => {
    expect(component.form.contains('itemId')).toBeTruthy();
    expect(component.form.contains('quantity')).toBeTruthy();
  });

  it('should load items on initialization', () => {
    expect(itemServiceMock.listAllItems).toHaveBeenCalled();
  });

  it('should throw an error when item service fails', () => {
    const error = new Error('Error con el servicio');
    itemServiceMock.listAllItems.mockReturnValue(throwError(() => error));

    const consoleSpy = jest.spyOn(console, 'error');

    component.getAllItems();

    expect(consoleSpy).toHaveBeenCalledWith('Ocurrio un error', error);
    consoleSpy.mockRestore();
  });

  it('should update itemId control when item is selected', () => {
    component.onItemSelected(1);
    expect(component.itemId.value).toBe(1);
    expect(component.itemId.touched).toBeTruthy;
  });

  it('should call addSupply and handle success response on form submission', () => {
    const mockResponse = { message: 'Supply added successfully' };
    supplyServiceMock.addSupply.mockReturnValue(of(mockResponse));

    component.form.patchValue({
      itemId: mockSupply.itemId,
      quantity: mockSupply.quantity,
    })

    component.onSubmit();

    expect(supplyServiceMock.addSupply).toHaveBeenCalledWith({
      itemId: mockSupply.itemId,
      quantity: mockSupply.quantity
    });
    expect(handleResponse).toHaveBeenCalledWith(component, mockResponse.message, true);
  });

  it('should handle error response on form submission', () => {
    const mockError = { error: { message: 'Error adding supply' } };
    supplyServiceMock.addSupply.mockReturnValue(throwError(() => mockError));

    component.form.patchValue({
      itemId: mockSupply.itemId,
      quantity: mockSupply.quantity,
    })

    component.onSubmit();

    expect(supplyServiceMock.addSupply).toHaveBeenCalledWith({
      itemId: mockSupply.itemId,
      quantity: mockSupply.quantity
    });
    expect(handleResponse).toHaveBeenCalledWith(component, mockError.error.message, false);
  });
});
