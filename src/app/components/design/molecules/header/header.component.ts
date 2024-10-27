import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { ADMIN } from '../../../shared/constants';
import { Router } from '@angular/router';
import { removeToken } from '../../../utils/removeToken';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {
  @Input() listElementsNav: {elementName: string, path:string}[] = []


  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  logout(){
    removeToken();
    this.router.navigate(['login']);
  }

}
