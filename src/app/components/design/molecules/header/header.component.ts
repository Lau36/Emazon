import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { ADMIN } from '../../../shared/constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {
  @Input() listElementsNav: {elementName: string, path:string}[] = []

  constructor() { }

  ngOnInit(): void {
  }

}
