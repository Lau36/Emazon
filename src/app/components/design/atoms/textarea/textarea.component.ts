import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-texttarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent implements OnInit {

  @Input() placeholder: string = '';
  @Input() control: FormControl = new FormControl();
  @Input() maxLengthTextSpan: string = '';
  @Input() requiredTextSpan: string = '';
  @Input() height: string = '';
  @Input() width: string = '';
  @Input() type: string = '';
  @Input() fontSize: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
