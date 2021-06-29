import { CategoryModel } from './CategoryModel';
export class ProductModel {
  id: number;
  productName: string;
  description: string;
  price: number;
  category?: any;
  productPic: string;
}
