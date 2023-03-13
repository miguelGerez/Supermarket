import { Local } from "./local";
import { Product } from "./product";

export class Stock{
  id: number;
  name: string;
  product: Product;
  local: Local;
  quantity: number;
}
