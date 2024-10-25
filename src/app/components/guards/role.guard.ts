import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenPayload } from '../core/models/interfaces';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const expectedRole = route.data["expectedRole"];
      const token = localStorage.getItem('token');
      if(token){
        const userRole = jwtDecode<TokenPayload>(token).role
        if(userRole === expectedRole){
          return true;
        }
        else{
          return false;
        }
      }
      return false

  }

}
