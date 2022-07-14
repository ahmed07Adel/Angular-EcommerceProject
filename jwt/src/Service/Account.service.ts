import { GenderModel } from './../Models/GenderModel';
import { RegisterModel } from './../Models/RegisterModel';
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { LoginModel } from 'src/Models/LoginModel';

@Injectable({
  providedIn: 'root'
})

export class AccountService{
  constructor(private http: HttpClient){}
  headers = {
    headers : new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    withCredentials: true

  };
  // Logout(){
  //   return this.http.post('https://localhost:44379/api/Account/Logout');
  // }
  GetGenderDropDown(): Observable<GenderModel[]> {
    return this.http.get<GenderModel[]>('https://localhost:44379/api/Account/GenderDropDownList').pipe();
  }

  RegiterAdmin(reg: RegisterModel): Observable<RegisterModel> {
    return this.http.post<RegisterModel>('https://localhost:44379/api/Account/AdminRegister', reg, this.headers).pipe();
  }
  Register(reg: RegisterModel): Observable<RegisterModel> {
    return this.http.post<RegisterModel>('https://localhost:44379/api/Account/Register', reg, this.headers).pipe();
  }
  Login(log: LoginModel): Observable<LoginModel> {

    return this.http.post<LoginModel>('https://localhost:44379/api/Account/Login', log, this.headers).pipe();
  }
  public LogOut = () => {
localStorage.removeItem('token');
localStorage.removeItem('userId');
  }
}
