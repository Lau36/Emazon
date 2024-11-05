import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  @Input() form!: FormGroup;
  @Input() title: string = "";
  @Input() contentButton: string = "";
  @Input() isLoading: boolean = false;
  @Input() showToast: boolean = false;
  @Input() mistakeOcurred: boolean = false;
  @Input() message: string = '';
  @Input() isDisabled: boolean = false;
  @Input() formFields!: {typeField: string, content: string, placeholder:string, control: FormControl, width: string, height: string, fontSize: string, type?: string}[];
  @Output() submitForm: EventEmitter<void> = new EventEmitter<void>();
  @Output() optionSelected: EventEmitter<number> = new EventEmitter<number>();
  @Input() data: unknown[] = [];
  @Input() showLink: boolean = false;
  @Input() info: string = '';
  @Input() pathLink: string = '';
  @Input() contentLink: string = '';

  onSubmit() {
    this.submitForm.emit();
  }

  onOptionChange(event: any){
    this.optionSelected.emit(Number(event));
  }

  constructor() { }

  ngOnInit(): void {
  }

}
