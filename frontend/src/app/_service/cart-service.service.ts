import { SaleDetail } from 'src/app/_model/saleDetail';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../_model/product';
import { Sale } from '../_model/sale';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart = new BehaviorSubject<SaleDetail[]>([]);

  // Expose the observable$ member for subscription.
  public cart$ = this.cart.asObservable();

  constructor() { }

  // Add items to the cart.
  addToCart(item) {
    let items = [...this.cart.value];
    let index = items.findIndex(i => i.id === item.id);
    if (index >= 0) {
      items[index].quantity++;
    } else {
      items.push({...item, quantity: 1});
    }
    this.cart.next(items);
  }

  // Remove items from the cart.
  removeFromCart(item) {
    this.cart.next(this.cart.value.filter(i => i !== item));
  }
}
