import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {

  @Input() options: any ;
  @Output() optionChange = new EventEmitter<any>();

  constructor() { }

  action(event: any){
    const selectedOption = event.target.value;
    this.optionChange.emit(selectedOption);
  }

  ngOnInit(): void {
  }

}
