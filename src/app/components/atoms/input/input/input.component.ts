import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit{

  @Input() placeholder: string = '';
  @Input() control: FormControl = new FormControl();
  @Input() maxLengthTextSpan: string = '';
  @Input() requiredTextSpan: string = '';


  constructor() { }

  ngOnInit(): void {}
}
