import { ProductService } from './../../Service/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductModel } from 'src/Models/ProductModel';
import { StarRate } from 'src/Models/StarRate';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  rateModel: StarRate;
  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: number;
  id: string;
  prodid: number;

prod: ProductModel;

  constructor(private activeRoute: ActivatedRoute, private service: ProductService) {

  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      this.id = params.id;
      // console.log(id);


      this.service.GetProductById(this.id).subscribe(c => {
      this.prod = c;
}, err => console.log(err));
}, err => console.log(err));
  }
  public createImgPath = (serverPath: string) => {
    return `https://localhost:44379/${serverPath}`;
  }
onclick(){

}
  countStar(stars) {
    debugger;
    let d = localStorage.getItem('userId');
    // this.service.ProductRating({productId: this.id, rate: stars}).subscribe(x => {
    this.service.ProductRating({productId: this.id, rate: stars}).subscribe(x => {
      debugger;

      d = x.userId;
      // stars = x.RateId;
          //  k = x['productId'];
    }, err => console.log(err));
    this.selectedValue = stars;
    console.log('Value of star', stars);
  }

}
