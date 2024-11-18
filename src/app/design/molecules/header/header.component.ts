import { Component,  ViewEncapsulation, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent{
  @Input() listElementsNav: {elementName: string, path:string, icon?: string}[] = []


  constructor(private readonly router: Router, private readonly authService: AuthService) { }

  logout(){
    this.authService.removeToken();
    this.router.navigate(['login']);
  }

}
