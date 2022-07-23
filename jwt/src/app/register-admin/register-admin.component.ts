import { RegisterModel } from './../../Models/RegisterModel';
import { AccountService } from './../../Service/Account.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-register-admin',
  templateUrl: './register-admin.component.html',
  styleUrls: ['./register-admin.component.css']
})
export class RegisterAdminComponent implements OnInit {

  constructor(private service: AccountService, private route: Router, private fb: FormBuilder) { }
  reg: RegisterModel;
 userForm: FormGroup;
 messageValidate = {
   email: {
     required: 'Email Needed',
     matchE: 'email is used'
   },
   password: {
     required: 'Password Neeeded',
     minLength: 'at least 5 characters'
   },
   confirmpassword: {
    required: 'please Confirm your password',
    matched: 'password donot match'
   }
 };
   ngOnInit() {
     this.reg = {
       email: '',
       password: '',
       confirmpassword: '',
       genderId:0,
       active:false
     };

     this.userForm = this.fb.group({
 email: ['', Validators.required],
 password: ['', [Validators.required, Validators.minLength(5)]],
 confirmpassword: ['', Validators.required],
 genderId: ['', Validators.required],

 });
   }
   ValidateUserModel() {
     this.reg.email = this.userForm.value.email;
     this.reg.password = this.userForm.value.password;
     this.reg.confirmpassword = this.userForm.value.confirmpassword;
   }
 register() {
   if (this.userForm.valid) {
     this.ValidateUserModel();
     this.service.RegiterAdmin(this.reg).subscribe(success => {
       alert('Account Registered Successfully');
       this.route.navigate(['login']);
     }, err => console.log(err));

   }

 }
 isPathMatch() {
   if (this.userForm.value.password !== '' && this.userForm.value.confirmpassword !== '') {
     if ((this.userForm.value.password !== this.userForm.value.confirmpassword) &&
      this.userForm.value.password.length >= 5 && this.userForm.value.confirmpassword.length >= 5) {
       return true;
     }

   }
   return false;
 }
 isEmailExist() {
   const em = this.userForm.value.email;
   if (this.reg.email === em ) {
     this.messageValidate.email.matchE = 'this Email is taken';
     return true;
   }

 }


}
