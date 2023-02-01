import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { Sale } from 'src/app/_model/sale';
import { SaleDetalleComponent } from '../../point-of-sale/saleDetail/saleDetail.component';

@Component({
  selector: 'app-sale-table',
  templateUrl: './sale-table.component.html',
  styleUrls: ['./sale-table.component.css']
})
export class SaleTableComponent {
  @Input() data: Sale[];
  displayedColumns: string[] = ['quantity', 'total', 'date', 'paymentMethod', 'account', 'acciones'];

  constructor(private dialog: MatDialog){

  }
  getTotalDetalle(sale: Sale) {
    let totalDetalle = 0;

    for (let detail of sale.saleDetail) {
      totalDetalle += detail.price * detail.quantity
    }

    return totalDetalle;
  }


  momentTooltip(value: Date) {
    return moment(value).format('LTS');
  }

  saleDetalleDialog(sale: Sale) {
    this.dialog.open(SaleDetalleComponent, {
      data: sale
    })
  }
}
