import { ProductModel } from './../../Models/ProductModel';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from './../../Service/product.service';
import { Component, OnInit } from '@angular/core';
import { CategoryModel } from 'src/Models/CategoryModel';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
categ: CategoryModel[];
c: CategoryModel;
img: File;
  constructor(private service: ProductService, private router: Router, private fb: FormBuilder,private http: HttpClient) {

    this.prodM = new FormGroup({
        productname: new FormControl(),
      description: new FormControl(),
      price: new FormControl(),
      category: new FormControl()
    });
  }
  sel;
  prod: ProductModel;
prodM: FormGroup;

  ngOnInit(): void {
    this.img = null;
    this.service.GetCategories().subscribe(p => {
      this.categ = p;
    }, err => console.log(err));
    this.prod = {

      id: 0,
      productName: '',
      price: 0,
      description: '',

      productPic: ''
    };

    this.prodM = this.fb.group({
      productname: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      productPic:['', Validators.required],
       category: ['', Validators.required]
    });
  }

  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }
    this.img = <File>files[0];
    // const formData = new FormData();
    // formData.append('file', fileToUpload, fileToUpload.name);
    // formData.append('price', fileToUpload, fileToUpload.name);
    // this.http.post('https://localhost:44379/api/Product/Upload/', formData, {reportProgress: true, observe: 'events'})
    //   .subscribe(x => {
    //     debugger;
    //     // this.prod.productPic = x;
    //     console.log("done");

    //     }
    //   );
  }
  ValidateModel() {
    this.prod.productName = this.prodM.value.productname;
    this.prod.price = this.prodM.value.price;
    this.prod.description = this.prodM.value.description;
    this.prod.productPic = this.prodM.value.productPic;

    this.prod.category = {"Id": this.prodM.value.category};
  }
  // onselect(event: any){
  //   return event.target.Selected.value;
  //   }
  // onKey(event) {
  //   debugger;
  //   const inputValue = event.target.Selected.value;
  //   return inputValue;
  // }
  // onSubmit() {
  //  var x =  this.c.id;
  //  x = this.prod.category;
  // }
  onselect(){
     console.log(this.sel);
    }

CreateProduct() {
  debugger;
  if (this.prodM.valid) {
  this.ValidateModel();
  const formData = new FormData();
  formData.append('file', this.img, this.img.name);
  formData.append('picture', this.img, this.img.name);
  formData.append('productName', this.prod.productName);
  formData.append('category.id', this.prod.category.Id);
  formData.append('price', this.prod.price.toString());
  formData.append('description', this.prod.description);

  this.service.CreateProduct(formData).subscribe(success => {
alert('product Created Successfully');
this.router.navigate(['/home']);
}, err => console.log(err));
}
}
HandleFiles(event: any){
  if (event.target.file !== null && event.target.files.length > 0) {
    this.img =  event.target.files[0];
    console.log(this.img.name);
  }
  this.img = null;

}
}
