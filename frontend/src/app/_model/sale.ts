import { SaleDetail } from "./saleDetail";
import { PaymentMethod } from "./paymentMethod";
import { Account } from "./account";

export class Sale {
  id: number;
  saleDetail!: SaleDetail[];
  date!: string;
  account!: Account;
  paymentMethod!: PaymentMethod;
}
