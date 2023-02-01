import { RouterModule } from '@angular/router';
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "src/app/material/material.module";
import { AccountEditionComponent } from './edition/user-edition.component';
import { AccountListComponent } from './list/list.component';
import { AccountRoutingModule } from './user-routing.module';
import { AccountsComponent } from './user.component';

@NgModule({
    imports: [
        MaterialModule,
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule,
        AccountRoutingModule

    ],
    exports: [],
    declarations: [
      AccountEditionComponent,
      AccountListComponent,
      AccountsComponent


    ],
    providers: [],
})
export class UserModule { }
