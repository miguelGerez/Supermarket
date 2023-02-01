import { TableDetailComponent } from './table-detail/table-detail.component';
import { SearchComponent } from './search/search.component';
import { MaterialModule } from '../../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PointOfSaleRoutingModule } from './point-of-sale.routing.module';
import { SaleDetalleComponent } from './saleDetail/saleDetail.component';
import { ProductGenericoComponent } from './sale/producto-generico/producto-generico.component';
import { PointOfSaleComponent } from './point-of-sale.component';
import { ThermalPrintModule } from 'ng-thermal-print';



@NgModule({
  declarations: [
    SaleDetalleComponent,
    ProductGenericoComponent,
    PointOfSaleComponent,
    SearchComponent,
    TableDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    PointOfSaleRoutingModule,
    ThermalPrintModule

  ]
})
export class PointOfSaleModule { }
