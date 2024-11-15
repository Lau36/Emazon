import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Router } from '@angular/router';
import { removeToken } from '../../../utils/removeToken';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent{
  @Input() listElementsNav: {elementName: string, path:string, icon?: string}[] = []


  constructor(private router: Router, private authService: AuthService) { }

  logout(){
    this.authService.removeToken();
    this.router.navigate(['login']);
  }

}
