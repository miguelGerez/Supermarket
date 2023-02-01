import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SaleDetail } from 'src/app/_model/saleDetail';
import { CartService } from 'src/app/_service/cart-service.service';

@Component({
  selector: 'app-table-detail',
  templateUrl: './table-detail.component.html',
  styleUrls: ['./table-detail.component.css']
})
export class TableDetailComponent {
  dataSource = new MatTableDataSource<SaleDetail>();
  displayedColumns: string[] = ['product', 'brand', 'quantity', 'priceUnidad', 'total'];
  constructor(private _cartService: CartService
  ) {
  }
  ngOnInit() {
    this._cartService.cart$.subscribe((data)=>{
      this.dataSource.data = data
      console.log(data)
    })
  }

  getTotalCost() {
    return this.dataSource.data.map(t => t.price * t.quantity).reduce((acc, value) => acc + value, 0);
  }
}
