import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import * as moment from 'moment';
import { Sale } from 'src/app/_model/sale';
import { ThermalPrintService } from 'src/app/_service/thermalPrint.service';

@Component({
  selector: 'app-sale-saleDetail',
  templateUrl: './saleDetail.component.html',
  styleUrls: ['./saleDetail.component.css']
})
export class SaleDetalleComponent implements OnInit {
  sale!: Sale;
  displayedColumns: string[] = ['product', 'quantity', 'price', 'total'];

  constructor(@Inject(MAT_DIALOG_DATA) public data: Sale,
  public dialogRef: MatDialogRef<SaleDetalleComponent>,
  private thermalPrintService :ThermalPrintService) { }

  ngOnInit(): void {
    this.sale = {...this.data}
  }

  getTotal(sale: Sale) {
    let total = 0;
    for (let detail of sale.saleDetail) {
      total += detail.price * detail.quantity
    }
    return total;
  }

  print(){
    this.thermalPrintService.print(this.sale)
  }

  momentTooltip(value: string) {
    return moment(value).format('LLL');
  }

}
