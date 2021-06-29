import { LoginComponent } from './login/login.component';
import { AccountService } from './../Service/Account.service';
import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { inject } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authService = this.injector.get(LoginComponent);
    let tokenReq = req.clone({
      setHeaders : {
        Authorization: `Bearer ${authService.GetToken()}`
      }
    });
    return next.handle(tokenReq);
  }
}
