import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownComponent } from './dropdown.component';
import { By } from '@angular/platform-browser';

describe('DropdownComponent', () => {
  let component: DropdownComponent;
  let fixture: ComponentFixture<DropdownComponent>;
  let brand: {id:number, name:string};

  beforeEach(async () => {
    brand = {id: 1, name: 'brand1'}
    await TestBed.configureTestingModule({
      declarations: [ DropdownComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should getOptionValue when is an object', () => {
    expect(component.getOptionValue(brand)).toBe(brand.id);
  });

  it('should getOptionLabel when is an object', () => {
    expect(component.getOptionLabel(brand)).toBe(brand.name);
  });

  it('should getOptionValue when is not an object', () => {
    expect(component.getOptionValue(2)).toBe(2);
  });

  it('should getOptionLabel when is not an object', () => {
    expect(component.getOptionLabel('name')).toBe('name');
  });

  it('should emit selectedValue when selectedOption is not found', () => {
    jest.spyOn(component.optionChange, 'emit');

    component.options = [
      { id: 1, name: 'Option 1' },
      { id: 2, name: 'Option 2' }
    ];

    fixture.detectChanges();

    const select = fixture.debugElement.query(By.css('select'));
    select.triggerEventHandler('change', { target: { value: '3' } });

    expect(component.optionChange.emit).toHaveBeenCalledWith('3');
  });

  it('should emit optionChange with the selected object', () => {
    jest.spyOn(component.optionChange, 'emit');

    component.options = [
      { id: 1, name: 'Option 1' },
      { id: 2, name: 'Option 2' }
    ];

    fixture.detectChanges();

    const select = fixture.debugElement.query(By.css('select'));
    select.triggerEventHandler('change', { target: { value: '1' } });

    expect(component.optionChange.emit).toHaveBeenCalledWith('1');
  });

  it('should emit optionChange with the raw value if no matching option is found', () => {
    jest.spyOn(component.optionChange, 'emit');

    component.options = [
      { id: 1, name: 'Option 1' },
      { id: 2, name: 'Option 2' }
    ];

    fixture.detectChanges();

    const select = fixture.debugElement.query(By.css('select'));
    select.triggerEventHandler('change', { target: { value: 'no exist' } });

    expect(component.optionChange.emit).toHaveBeenCalledWith('no exist');
  });


});
