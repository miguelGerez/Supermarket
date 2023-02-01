import { TagsComponent } from './tags/etiquetas.component';
import { PointOfSaleComponent } from './point-of-sale/point-of-sale.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoryComponent } from './inventory/inventory.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GuardService } from '../_service/guard.service';
import { Error404Component } from '../component/error404/error404.component';
import { ProfileComponent } from './users/profile/profile.component';
import { AccountsComponent } from './users/user.component';
import { ConfigurationComponent } from './configuration/configuration.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'sale',
    pathMatch: 'prefix'
  },
  { path: 'not-403', component: Error404Component },

  { path: 'perfil', component: ProfileComponent, title: 'Perfil', },

  {
    path: 'inventario', component: InventoryComponent, title: 'Inventario',
    loadChildren: () => import('./inventory/inventory.module').then(m => m.InventoryModule)
  },

  {
    path: 'punto-de-venta', component: PointOfSaleComponent, title: 'Punto de venta',
    loadChildren: () => import('./point-of-sale/point-of-sale.module').then(m => m.PointOfSaleModule)
  },

  {
    path: 'dashboard', component: DashboardComponent, title: 'Dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },

  {
    path: 'usuarios', component: AccountsComponent, title: 'Usuarios',
    loadChildren: () => import('./users/user.module').then(m => m.UserModule)
  },

  {
    path: 'etiquetas', component: TagsComponent, title: 'Etiquetas',
  },

  {
    path: 'configuracion', component: ConfigurationComponent, title: 'Configuracion',
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { }
