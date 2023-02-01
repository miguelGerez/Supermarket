import { BardCodeSinProductComponent } from './../component/snackBar/bard-code-sin-producto/bard-code-sin-producto.component';
import { ProfileComponent } from './users/profile/profile.component';
import { TagsComponent } from './tags/etiquetas.component';
import { PaymentMethodChartComponent } from './dashboard/payment-method-chart/payment-method-chart.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { LayoutComponent } from 'src/app/component/layout/layout.component';
import { BrandComponent } from './configuration/brand/brand.component';
import { BrandEditionComponent } from './configuration/brand/edition/brand-edition.component';
import { CategoryEdicionComponent } from './configuration/category/edition/category-edition.component';
import { ProductGenericoComponent } from './point-of-sale/sale/producto-generico/producto-generico.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { PagesRoutingModule } from './pages-routing.module';
import { RecuperarComponent } from '../component/login/recuperar/recuperar.component';
import { TokenComponent } from '../component/login/recuperar/token/token.component';
import { Error404Component } from '../component/error404/error404.component';
import { InventoryComponent } from './inventory/inventory.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ThermalPrintModule } from 'ng-thermal-print';
import { RouterModule } from '@angular/router';
import { ConfigurationComponent } from './configuration/configuration.component';
import { SaleDetailComponent } from './point-of-sale/sale/detalle/saleDetail.component';
import { CategoryComponent } from './configuration/category/category.component';
import { AnnualChartComponent } from './dashboard/annual-chart/annual-chart.component';
import { MonthlyChartComponent } from './dashboard/monthly-chart/monthly-chart.component';
import { ScheduleChartComponent } from './dashboard/schedule-chart/schedule-chart.component';
import { AccountsChartComponent } from './dashboard/account-chart/account-chart.component';
import { BrandChartComponent } from './dashboard/brand-chart/brand-chart.component';
import { SaleTableComponent } from './dashboard/sale-table/sale-table.component';
import { NgChartsModule } from 'ng2-charts';


@NgModule({
    imports: [
        MaterialModule,
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        PagesRoutingModule,
        ThermalPrintModule,
        RouterModule,
        NgChartsModule

    ],
    exports: [],
    declarations: [
      RecuperarComponent,
      TokenComponent,
      Error404Component,
      InventoryComponent,
      ConfigurationComponent,
      DashboardComponent,
      SaleDetailComponent,
      CategoryEdicionComponent,
      CategoryComponent,
      BrandEditionComponent,
      BrandComponent,
      LayoutComponent,
      PaymentMethodChartComponent,
      AnnualChartComponent,
      MonthlyChartComponent,
      ScheduleChartComponent,
      BrandChartComponent,
      SaleTableComponent,
      MonthlyChartComponent,
      AccountsChartComponent,
      TagsComponent,
      LayoutComponent,
      ProfileComponent,
      BardCodeSinProductComponent
    ],
    providers: [],
})
export class PagesModule { }
