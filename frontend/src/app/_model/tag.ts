import { Product } from "./product";

export class Tag {
  id: number;
  date!: string;
  print!: boolean;
  products!: Product[]
}

