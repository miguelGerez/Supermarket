import { Product } from './../../_model/product';
import { InventoryListarComponent } from './list/list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoryComponent } from './inventory.component';
import { InventoryEdicionComponent } from './edition/edition.component';

export const routes: Routes = [
  {
    path: 'listar', component: InventoryListarComponent
  },

  {
    path: 'producto', component: InventoryEdicionComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InventoryRoutingModule { }
