import { MaterialModule } from './../../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryEdicionComponent } from './edition/edition.component';
import { InventoryListarComponent } from './list/list.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InventoryRoutingModule } from './inventory-routing.module';



@NgModule({
  declarations: [
    InventoryEdicionComponent,
    InventoryListarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    InventoryRoutingModule

  ]
})
export class InventoryModule { }
