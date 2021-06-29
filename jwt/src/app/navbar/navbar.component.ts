import { ProductModel } from './../../Models/ProductModel';
import { ProductService } from './../../Service/product.service';
import { Component, OnInit } from '@angular/core';
import { CategoryModel } from 'src/Models/CategoryModel';
import { AccountService } from 'src/Service/Account.service';
import { Router } from '@angular/router';
import { LoginModel } from 'src/Models/LoginModel';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
username= '';
cat: CategoryModel[];
sel;
log: LoginModel;
p: ProductModel[];
users: LoginModel;
  constructor(private service: ProductService, public accService: AccountService, private route: Router) {
// if (accService.Login(this.log)) {
//   // route.navigate
//   (['chat']);
//   }
}
  public Logout = () => {
this.accService.LogOut();
sessionStorage.removeItem('loggeduser');
var r = document.getElementById('userhide');
r.style.display = 'none';
// window.location.reload();
this.route.navigate(['login']);


  }
  
  hide(){
    var res = document.getElementById("hide");
    if (localStorage.getItem('token')) {
      res.style.display = 'none';
    }
    else{
      res.style.display = 'show';
    }
  }
  ngOnInit(): void {
    this.username = sessionStorage.getItem('loggeduser');
    this.service.GetCategories().subscribe(d=>{
      this.cat = d;
    }, err => console.log(err));  }

   
  onselect(){
    if (this.sel == 1) {
this.service.GetClothes().subscribe(a=>{
this.p = a;
}, err => console.log(err));
    }
    if (this.sel == 2) {
      this.service.GetClothes().subscribe(l=>{
        this.p = l;
        }, err => console.log(err));
      console.log(this.sel);
   }
}
}
