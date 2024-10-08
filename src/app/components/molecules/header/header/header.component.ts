import { Component, OnInit } from '@angular/core';
import { ADMIN } from '../../../utils/constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {



  userName: string = ADMIN;

  constructor() { }

  ngOnInit(): void {
  }

}
