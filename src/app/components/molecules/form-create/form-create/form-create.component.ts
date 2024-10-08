import { EXCEEDES_MAXIMUN_CHARACTERS_CATEGORY_NAME, EXCEEDES_MAXIMUN_CHARACTERS_CATEGORY_DESCRIPTION, REQUIRED_FIELD, CATEGORY_CREATED } from './../../../utils/constants';
import { createCategory } from './../../../../models/interfaces';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, Input, Output, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { CategoryService } from '../../../../services/category.service';
import { ToastComponent } from '../../../atoms/toast/toast.component';

@Component({
  selector: 'app-form-create',
  templateUrl: './form-create.component.html',
  styleUrls: ['./form-create.component.scss']
})
export class FormCreateComponent implements OnInit {

  @ViewChild(ToastComponent) toastComponent!: ToastComponent;

  @Input() title: string = "";
  @Input() textName: string = "";
  @Input() textDescription: string = "";
  @Input() placeholder: string = "";
  @Input() contentButton: string = "";

  categoryNameValidation: string = EXCEEDES_MAXIMUN_CHARACTERS_CATEGORY_NAME;
  categoryDescriptionValidation: string = EXCEEDES_MAXIMUN_CHARACTERS_CATEGORY_DESCRIPTION;
  required: string = REQUIRED_FIELD;

  isLoading: boolean = false;
  mistakeOcurred: boolean = false;
  showToast: boolean = false;
  isDisabled: boolean = false;

  message: string = '';


  form: FormGroup;

  public createCategory: createCategory = {
    categoryName: '',
    categoryDescription: ''
  }

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService
  ) {
    this.form = this.fb.group({
      categoryName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      categoryDescription: new FormControl('', [Validators.required, Validators.maxLength(90)]),
    });


  }

  get categoryName (){
    return this.form.get('categoryName') as FormControl;
  }

  get categoryDescription (){
    return this.form.get('categoryDescription') as FormControl;
  }
  ngOnInit() {}


  onSubmit(){
    if(this.form.valid){
      this.createCategory.categoryName = this.categoryName.value;
      this.createCategory.categoryDescription = this.categoryDescription.value;
      this.isLoading = true;
      this.categoryService.createCategory(this.createCategory).subscribe(
        {
            next: (response) => {
              setTimeout(() => {
                this.isLoading = false;
              }, 2000);
              this.mistakeOcurred = false;
              this.showToast = true;
              this.message = CATEGORY_CREATED
              setTimeout(() => {
                this.showToast = false;
              }, 3000);
              this.form.reset();
            },
            error: (error) => {
              this.isLoading = false;
              this.mistakeOcurred = true;
              this.showToast = true;
              this.message = error.error.message
              setTimeout(() => {
                this.showToast = false;
              }, 3000);
            }
      }
   )
    }
  }

}
