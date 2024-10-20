import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-create',
  templateUrl: './form-create.component.html',
  styleUrls: ['./form-create.component.scss']
})
export class FormCreateComponent {

  @Input() form!: FormGroup;
  @Input() categoryName: any;
  @Input() categoryDescription: any;
  @Input() title: string = "";
  @Input() textName: string = "";
  @Input() textDescription: string = "";
  @Input() placeholder: string = "";
  @Input() contentButton: string = "";
  @Input() required!: string;
  @Input() isLoading: boolean = false;
  @Input() showToast: boolean = false;
  @Input() mistakeOcurred: boolean = false;
  @Input() message: string = '';
  @Input() isDisabled: boolean = false;
  @Input() formControlError: boolean = false;
  @Input() messageError: string = '';

  @Output() submitForm: EventEmitter<void> = new EventEmitter<void>();


  onSubmit() {
    this.submitForm.emit();
  }

}
