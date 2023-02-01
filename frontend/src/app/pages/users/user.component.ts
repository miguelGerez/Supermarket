import { LayoutService } from './../../_service/layout.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Account } from 'src/app/_model/account';
import { AccountEditionComponent } from './edition/user-edition.component';

@Component({
  selector: 'app-accounts',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class AccountsComponent implements OnInit {

  constructor(public dialog: MatDialog,
    private layoutService: LayoutService) { }

  ngOnInit(): void {
  }

  ngOnChanges(){
    this.layoutService.setTitle('Usuarios')
  }

  openDialogEdicionAccount(Account?: Account) {
    this.dialog.open(AccountEditionComponent, {
      data: Account,
    });
  }

}
