import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {

  @Input() content: string = "";
  @Output() action = new EventEmitter<void>();
  @Input() isDisabled: boolean = false;
  @Input() width: string = "100%";

  handleClick(){
    this.action.emit();
  }

  constructor() { }


}
