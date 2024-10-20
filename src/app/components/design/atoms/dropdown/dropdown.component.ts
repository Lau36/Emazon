import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {

  @Input() options: any[] = [];
  @Input() width: string = "100px"
  @Input() messageError: string = '';
  @Input() isAnError: boolean = false;
  @Output() optionChange = new EventEmitter<any>();

  constructor() { }

  getOptionValue(option: any){
    return typeof option === 'object' ? option.id : option;

  }

  getOptionLabel(option: any){
    return typeof option === 'object' ? option.name : option;
  }

  action(event: any){
    const selectedValue = event.target.value;
    const selectedOption = this.options.find(option =>{
      this.getOptionValue(option) === selectedValue
  });
    this.optionChange.emit(selectedOption ? selectedOption : selectedValue);
  }

  ngOnInit(): void {
  }

}
