import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-dynamic',
  templateUrl: './form-dynamic.component.html',
  styleUrls: ['./form-dynamic.component.scss']
})
export class FormDynamicComponent implements OnInit {

  @Input() field!: {typeField: string, content: string, placeholder:string, control: FormControl, width: string, height: string, fontSize: string, type?: string};

  constructor() { }

  ngOnInit(): void {
  }

}
