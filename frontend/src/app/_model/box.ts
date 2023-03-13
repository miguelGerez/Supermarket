import { Provider } from "@angular/core";
import { Category } from "./category";
import { Classification } from "./classification";
import { Product } from "./product";

export class Box{
  id: number;
  bard_code: string;
  name: string;
  product: Product;
  purchasePrice: number;
  salePrice: number;
  gain: number;
  priceUptime: Date;
  modifyUptime: Date;
  category: Category;
  classification: Classification;
  providers: Provider[];
  descripcion: string;
  profit: number;

}
