import { Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-text-component',
  templateUrl: './text-component.component.html',
  styleUrls: ['./text-component.component.scss']
})
export class TextComponentComponent implements OnInit{

  @Input() content: string = "";
  @Input() color: string = "";
  constructor() { }

  ngOnInit() {
  }

}
