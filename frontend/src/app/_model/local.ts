import { Sale } from "./sale";
import { Stock } from "./stock";

export class Local {
  id: number;
  name!: string;
  stock!: Stock[];
  sales!: Sale[];
}
