import { AddToCartModel } from './../Models/AddToCartModel';
import { CategoryModel } from './../Models/CategoryModel';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductModel } from 'src/Models/ProductModel';
import { StarRate } from 'src/Models/StarRate';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient ) { }
  headers = {
    headers : new HttpHeaders({
      'Content-Type': 'application/json;charset=utf-8'
    }),
    withCredentials: true

  };
  AddProductToCart(add): Observable<AddToCartModel> {
    debugger;
    return this.http.post<AddToCartModel>('https://localhost:44379/api/Product/AddToCart', add).pipe();
  }
  ProductRating(model): Observable<StarRate> {
    debugger;
    return this.http.post<StarRate>('https://localhost:44379/api/Product/StarRating',model).pipe();
  }
  GetClothes(): Observable<ProductModel[]>{
    return this.http.get<ProductModel[]>('https://localhost:44379/api/Product/GetClothesProducts');
  }
  GetElectronics(): Observable<ProductModel[]>{
    return this.http.get<ProductModel[]>('https://localhost:44379/api/Product/GetElectronicsProducts');
  }
  Search(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>('https://localhost:44379/api/Product/Search').pipe();
  }
  GetCategories(): Observable<CategoryModel[]> {
    return this.http.get<CategoryModel[]>('https://localhost:44379/api/Category/GetCategories').pipe();
  }
  GetProducts(): Observable<ProductModel[]> {

    return this.http.get<ProductModel[]>('https://localhost:44379/api/Product/GetAllProducts').pipe();
  }
GetProductById(id: string): Observable<ProductModel>{
  return this.http.get<ProductModel>('https://localhost:44379/api/Product/GetProductById/' + id).pipe();
}
CreateProduct(prod: FormData ): Observable<ProductModel>{
  return this.http.post<ProductModel>('https://localhost:44379/api/Product/CreateProduct/', prod).pipe();
}
UpdateProduct(id: string, prod: ProductModel): Observable<ProductModel>{
    return this.http.put<ProductModel>('https://localhost:44379/api/Product/UpdateProduct/' + id, prod).pipe();
}
DeleteProduct(id: number) {
  return this.http.delete('https://localhost:44379/api/Product/' + id);
}
}
