import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PLACEHOLDER_REGULAR_INPUT } from 'src/app/shared/constants/constants';
import { ADD, ADD_SUPPLY, ITEM, QUANTITY } from 'src/app/shared/constants/supply';
import { addSupply } from 'src/app/shared/models/supply';
import { SupplyService } from 'src/app/shared/services/supply.service';

@Component({
  selector: 'app-add-supplies',
  templateUrl: './add-supplies.component.html',
  styleUrls: ['./add-supplies.component.scss']
})
export class AddSuppliesComponent implements OnInit {
  constructor(
    private supplyService: SupplyService,
    private fb: FormBuilder
  ) { }

  title: string = ADD_SUPPLY;
  form!: FormGroup;
  isLoading: boolean = false;
  showToast: boolean = false;
  mistakeOcurred: boolean = false;
  contentButton: string = ADD;
  message: string = '';

  formFields: any[] = [];

  supply: addSupply = {
    itemId: 0,
    quantity: 0
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      itemId: [ 0, Validators.required],
      quantity: [ 0, Validators.required]
    })

    this.formFields = [
      {
        typeField: 'select',
        content: ITEM,
        placeholder: null,
        control: this.itemId,
        width: '20rem',
        height: '1rem',
        fontSize: '0.8rem',
        type: "text"
      },
      {
        typeField: 'input',
        content: QUANTITY,
        placeholder: PLACEHOLDER_REGULAR_INPUT,
        control: this.quantity,
        width: '20rem',
        height: "1rem",
        fontSize: "0.8rem",
        type: 'number'
      }
    ]
  }

  get itemId(){
    return this.form.get('itemId') as FormControl;
  }

  get quantity(){
    return this.form.get('quantity') as FormControl;
  }

  onSubmit(){
    if(this.form.valid){

    }
  }

}
