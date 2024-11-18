import { Component, Input} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-texttarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent {

  @Input() placeholder: string = '';
  @Input() control: FormControl = new FormControl();
  @Input() height: string = '';
  @Input() width: string = '';
  @Input() type: string = '';
  @Input() fontSize: string = '';

  validationMessages: { [key: string]: (error: string) => string } = {
    required: () => 'Este campo es obligatorio.',
    maxlength: (error: any) => `La longitud máxima es de ${error.requiredLength} caracteres.`
  };

  errorMessages(): string[]{
    if(!this.control.errors || !(this.control.touched || this.control.dirty)){
      [];
    }
    return Object.keys(this.control.errors ?? {}).map(key => {
      const errorValue = this.control.errors?.[key];
      const errorMessage = this.validationMessages[key];
      return errorMessage ? errorMessage(errorValue) : 'error';
    })
  }

  constructor() { }


}
