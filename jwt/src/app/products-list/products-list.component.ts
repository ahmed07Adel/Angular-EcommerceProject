import { CategoryModel } from 'src/Models/CategoryModel';
import { ProductService } from './../../Service/product.service';
import { Component, OnInit } from '@angular/core';
import { modalConfigDefaults } from 'ngx-bootstrap/modal/modal-options.class';
import { ProductModel } from 'src/Models/ProductModel';
import { AccountService } from 'src/Service/Account.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
prod: ProductModel[];
prodD: ProductModel;
pr: ProductModel[] = [];
cat: CategoryModel[];
ProductName: string;
sel;
userDetails;

  constructor(private service: ProductService,private accservice: AccountService) { }

  ngOnInit(): void {
    if (localStorage.getItem('token')!= null) {
      localStorage.getItem('userId');                       
          }
    this.service.GetCategories().subscribe(d => {
      this.cat = d;
    }, err => console.log(err));
    this.pr = [];
    this.service.GetProducts().subscribe(p => {
      this.prod = p;
    }, err => console.log(err));
  }
  DeleteProd(id: number) {
    this.service.DeleteProduct(id).subscribe(success => {
      alert('product Deleted');
      window.location.reload();
    }, err => console.log(err));
  }
  public createImgPath = (serverPath: string) => {
    return `https://localhost:44379/${serverPath}`;
  }
  onselect() {
    if (this.sel === 1) {
      this.service.GetClothes().subscribe(a => {
      this.prod = a;
      }, err => console.log(err));
          }
    if (this.sel === 2) {
            this.service.GetElectronics().subscribe(l => {
              this.prod = l;
              }, err => console.log(err));
   }
    console.log(this.sel);
  }
    Search() {
if (this.ProductName !== '') {
  this.prod = this.prod.filter(res => {
    return res.productName.toLocaleLowerCase().match(this.ProductName.toLocaleLowerCase());
  });
} else if (this.ProductName === '') {
this.ngOnInit();
}

  }
//   GetUser(){
//     if (localStorage.getItem('token')!= null) {
//       debugger;
//       this.accservice.GetUserId().subscribe(x=>{
// this.userDetails = x;
// console.log(x);
//      }, err => console.log(err));
//     }
//   }

}
