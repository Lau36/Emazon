import { createCategory } from './../../../../models/interfaces';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, Input, Output, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { ToastComponent } from 'src/app/components/atoms/toast/toast.component';

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
      console.log("Info",this.createCategory);
      this.toastComponent.show("Correcto")
  //     this.categoryService.createCategory(this.createCategory).subscribe(
  //       {
  //           next: (response) => {
  //             console.log("esta es la respuesta", response);

  //           },
  //           error: (error) => {
  //             console.log("error", error.error.message);
  //           }
  //     }
  //  )
    }
    else{
      console.log("verifica el error",this.categoryName.errors);
    }
  }

}
