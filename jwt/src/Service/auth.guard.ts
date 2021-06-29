import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanDeactivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginModel } from 'src/Models/LoginModel';
import { AccountService } from './Account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  log: LoginModel;
  constructor(private route: Router, private service: AccountService){}
  canActivate(): boolean{
    debugger;
if (localStorage.getItem('token') != null && localStorage.getItem('token') != '') {
  return true
}else{
  this.route.navigate(['/login'])
  return false;
}
  }


  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }

}
