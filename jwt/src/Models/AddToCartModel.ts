import { ProductModel } from 'src/Models/ProductModel';
export class AddToCartModel{
  id: number;
  productId: number;
  quantity: number;
  addTime: Date;
  product_Name: string;
  price: number;
}
