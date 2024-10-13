import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-create-item',
  templateUrl: './form-create-item.component.html',
  styleUrls: ['./form-create-item.component.scss']
})
export class FormCreateItemComponent implements OnInit {

  @Input() form!: FormGroup;
  @Input() name: any;
  @Input() description: any;
  @Input() price: any;
  @Input() amount: any;
  @Input() title: string = "";
  @Input() type: string = "";

  @Input() textName: string = "";
  @Input() textDescription: string = "";
  @Input() textPrice: string = "";
  @Input() textAmount: string = "";
  @Input() textCategories: string = "";
  @Input() textBrands: string = "";

  @Input() placeholder: string = "";
  @Input() contentButton: string = "";

  @Input() nameValidation!: string;
  @Input() descriptionValidation!: string;
  @Input() required!: string;

  @Input() isLoading: boolean = false;
  @Input() showToast: boolean = false;
  @Input() mistakeOcurred: boolean = false;
  @Input() message: string = '';
  @Input() isDisabled: boolean = false;
  @Input() inputCategoriesIsDisabled: boolean = false;

  @Input() brands: {id:number, name:string, description:string}[] = [];
  @Input() categories: {id:number, categoryName:string, categoryDescription:string, isDisabled:boolean}[] = [];

  @Output() submitForm: EventEmitter<void> = new EventEmitter<void>();
  @Output() toggleCategorySelectionAction: EventEmitter<number> = new EventEmitter<number>();
  @Output() brandSelected: EventEmitter<number> = new EventEmitter<number>();

  toggleCategorySelection(categorySelected: number){
    this.toggleCategorySelectionAction.emit(categorySelected);
  }

  onBrandChange(event: any){

    var brandId = Number(event.target.value);
    this.brandSelected.emit(brandId);
  }

  onSubmit() {
    this.submitForm.emit();
  }

  constructor() { }

  ngOnInit(): void {
  }

}
