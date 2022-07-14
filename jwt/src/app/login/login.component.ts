import { AccountService } from './../../Service/Account.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginModel } from './../../Models/LoginModel';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service: AccountService, private fb: FormBuilder, private route: Router) { }
  id: string;
log: LoginModel;
userLog: FormGroup;
message: string;
userId: string;
messageValidate: {
  email: {
    required: 'Email Needed'
  },
  password: {
    required: 'Password Neeeded',
    minLength: 'at least 5 characters'
  }
};

  ngOnInit(): void {
    this.userId='';
    this.message = '';
    this.log = {

      email: '',
      password: '',
      rememberMe: false
    };
    this.userLog = this.fb.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(5)]],
      rememberMe : false
    });
  }
  ValidateModel() {
    this.log.email = this.userLog.value.email;
    this.log.password = this.userLog.value.password;
    this.log.rememberMe =  this.userLog.value.rememberMe;
  }



  login() {
if (this.userLog.valid) {
  this.ValidateModel();

  this.service.Login(this.log).subscribe(success => {
    console.log(success);
    localStorage.setItem('token', success['message']);
    localStorage.setItem('userId',success['userId']);
    localStorage.getItem('userId');
    localStorage.getItem('token');
    sessionStorage.setItem('loggeduser', this.log.email);
    localStorage.getItem('loggeduser');
    location.reload();
    this.route.navigate(['home']);
  }, err => console.log(err));
}

  }
  GetToken() {
    return localStorage.getItem('token');
  }

}
