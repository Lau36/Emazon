import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input() content: string = "";
  @Output() action = new EventEmitter<void>();
  @Input() isDisabled: boolean = false;

  handleClick(){
    this.action.emit();
  }

  constructor() { }

  ngOnInit(): void {
  }

}
