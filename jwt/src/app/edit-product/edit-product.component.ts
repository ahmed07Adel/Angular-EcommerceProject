import { CategoryModel } from './../../Models/CategoryModel';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductModel } from '../../Models/ProductModel';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from './../../Service/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
prod: ProductModel;
ProdUpdate: FormGroup;
sel;
cat: CategoryModel[];
  constructor(private service: ProductService, private router: Router, private fb: FormBuilder, private activeRoute: ActivatedRoute) {
    this.ProdUpdate = new FormGroup({
      category: new FormControl(),
      productname: new FormControl(),
      description: new FormControl(),
      price: new FormControl()
    });
  }

  ngOnInit(): void {
this.service.GetCategories().subscribe(o => {
  debugger;
  this.cat = o;

  this.activeRoute.params.subscribe(params => {
      const id = params.id;
      console.log(id);


      this.service.GetProductById(id).subscribe(c => {
      this.prod = c;
}, err => console.log(err));
}, err => console.log(err));
}, err => console.log(err));
this.prod = {
      id : 0,
      price : 0,
      productName: '',
      description: '',
      category: null,
      productPic: ''

    };
this.ProdUpdate = this.fb.group({
      productname: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required]

    });
  }
  ValidateModel() {
    this.prod.productName = this.ProdUpdate.value.productname;
    this.prod.price = this.ProdUpdate.value.price;
    this.prod.description = this.ProdUpdate.value.description;
    this.prod.category = {"Id": this.ProdUpdate.value.category};
  }
  UpdateProduct(id: string) {
    if (this.ProdUpdate.valid) {

      this.ValidateModel();
      this.service.UpdateProduct(id, this.prod).subscribe(success => {
        alert('Product Updated Successfully');
        this.router.navigate(['/home']);
      }, err => console.log(err));
  }
}
onselect() {
  console.log(this.sel);
 }
}
