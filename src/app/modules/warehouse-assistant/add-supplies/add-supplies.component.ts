import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PLACEHOLDER_REGULAR_INPUT } from '../../../shared/constants/constants';
import { ADD, ADD_SUPPLY, ITEM, QUANTITY } from '../../../shared/constants/supply';
import { AddSupply } from '../../../shared/models/supply';
import { ItemService } from '../../../shared/services/item.service';
import { handleResponse } from '../../../utils/helpers/handleResponse';
import { hideToast } from '../../../utils/helpers/hideToast';
import { SupplyService } from '../../../shared/services/supply.service';

@Component({
  selector: 'app-add-supplies',
  templateUrl: './add-supplies.component.html',
  styleUrls: ['./add-supplies.component.scss']
})
export class AddSuppliesComponent implements OnInit {
  constructor(
    private  readonly supplyService: SupplyService,
    private  readonly itemService: ItemService,
    private  readonly fb: FormBuilder
  ) { }

  title: string = ADD_SUPPLY;
  form!: FormGroup;
  isLoading: boolean = false;
  showToast: boolean = false;
  mistakeOcurred: boolean = false;
  contentButton: string = ADD;
  message: string = '';

  formFields: any[] = [];

  items: {id: number, name: string}[] = [];

  supply: AddSupply = {
    itemId: 0,
    quantity: 0
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      itemId: new FormControl('', Validators.required),
      quantity: new FormControl('', Validators.required)
    })

    this.formFields = [
      {
        typeField: 'dropdown',
        content: ITEM,
        placeholder: null,
        control: this.itemId,
        width: '100%',
        height: '1rem',
        fontSize: '0.8rem',
        type: "text"
      },
      {
        typeField: 'input',
        content: QUANTITY,
        placeholder: PLACEHOLDER_REGULAR_INPUT,
        control: this.quantity,
        width: '100%',
        height: "1rem",
        fontSize: "0.8rem",
        type: 'number'
      }
    ]

    this.getAllItems();
  }

  get quantity(){
    return this.form.get('quantity') as FormControl;
  }
  get itemId(){
    return this.form.get('itemId') as FormControl;
  }

  onItemSelected(itemId: number){
    this.itemId.setValue(itemId);
    this.itemId.markAsTouched();
  }

  onSubmit(){
    if(this.form.valid){
      this.supply = {
        itemId: Number(this.itemId.value),
        quantity: Number(this.quantity.value)
      }
      this.isLoading = true;

      this.supplyService.addSupply(this.supply).subscribe({
        next: (response) => {
          handleResponse(this, response.message, true);
          hideToast(this.showToast);
          this.form.reset();
        },
        error: (error) => {
          handleResponse(this, error.error.message, false);
          hideToast(this.showToast);
        },
      })
    }
  }

  getAllItems(){
    this.itemService.listAllItems().subscribe({
      next: (response) => {
        this.items = response.map(item => ({
          id: item.id,
          name: item.name
        }))

      },
      error: (error) => {
        console.error('Ocurrio un error', error);
      },
    })
  }
}
