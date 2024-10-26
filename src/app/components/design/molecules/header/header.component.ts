import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ADMIN } from '../../../shared/constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {
  listElementsNav: {elementName: string, path:string}[] = []

  constructor() { }

  ngOnInit(): void {
  }

}
