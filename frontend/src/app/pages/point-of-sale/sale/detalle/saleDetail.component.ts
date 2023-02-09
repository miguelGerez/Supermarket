import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SaleDetail } from 'src/app/_model/saleDetail';
import { SaleService } from 'src/app/_service/sale.service';

@Component({
  selector: 'app-saleDetail',
  templateUrl: './saleDetail.component.html',
  styleUrls: ['./saleDetail.component.css']
})
export class SaleDetailComponent implements OnInit {
  saleDetail = new SaleDetail();
  constructor(
    public dialogRef: MatDialogRef<SaleDetailComponent>,
    private saleService: SaleService) { }

  ngOnInit(): void {
  }

  SendDetail(){
    this.saleService.setDetalle(this.saleDetail)
    this.dialogRef.close()
  }
}
