import { Brand } from "./brand";
import { Category } from "./category";
import { Clasification } from "./clasification";

import { Provider } from "./provider";

export class Product {
  id: number;
  name!: string;
  brand!: Brand;
  salePrice!: number;
  purchasePrice!: number;
  gain!: number;
  bard_code!: string;
  descripcion!: string;
  clasification!: Clasification;
  category!: Category;
  netContent!: string;
  modifyUptime!: string;
  quickAccess!: Boolean;
  modify_uptime!: string;
  price_uptime!: string;
  providers!: Provider[];
}
