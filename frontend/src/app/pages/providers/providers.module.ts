import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { EditionComponent } from './edition/edition.component';
import { ProvidersComponent } from './providers.component';



@NgModule({
  declarations: [

       ListComponent,
       EditionComponent,
       ProvidersComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class ProvidersModule { }
