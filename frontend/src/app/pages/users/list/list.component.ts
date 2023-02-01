import { Route, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { Account } from 'src/app/_model/account';
import { AccountService } from 'src/app/_service/account.service'
import { AccountEditionComponent } from '../edition/user-edition.component';

@Component({
  selector: 'app-Account',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class AccountListComponent implements OnInit {
  displayedColumnsAccount = ['avatar', 'account' ,'name', 'last_name', 'estado', 'acciones'];
  displayedColumnsEspecialidad: string[] = ['especialidad', 'acciones'];


  dataSourceAccount!: MatTableDataSource<Account>;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private AccountService: AccountService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,

  ) //private route: ActivatedRoute,
  {}

  ngOnInit(): void {

     //al iniciar la pagina trae la informacion
     this.AccountService.listar().subscribe((data) => {
      this.crearTablaAccount(data);
    });

    //cuando ProductCambio tenga un cambio, se va a llenar la tabla
    this.AccountService.getAccountCambio().subscribe((data) => {
      this.crearTablaAccount(data);
    });


    this.AccountService.getMensajeCambio().subscribe((data) => {
      this.snackBar.open(data, 'Aviso', { duration: 2000 });
    });

  }



  eliminarAccount(account: Account) {
    this.AccountService.eliminar(account.id).subscribe(() =>
      this.AccountService.listar().subscribe((data) => {
        this.dataSourceAccount = new MatTableDataSource(data);
        this.AccountService.setMensajeCambio(
          'Se elimino correctamente ' + account.username
        );
      })
    );
  }

  crearTablaAccount(data: Account[]) {
    this.dataSourceAccount = new MatTableDataSource(data);
    this.dataSourceAccount.sort = this.sort;
  }



  openDialogEdicionAccount(Account?: Account) {
    /*
    this.dialog.open(AccountEditionComponent, {
      data: Account,

    });
    */
    this.AccountService.setAccountEdition(Account);

    this.router.navigateByUrl('pages/usuarios/perfil')

  }


  estado(account: Account){
    this.AccountService.modificar(account).subscribe(data=>{
      if(data){
        this.mensaje('Se ha cambiado el estado de ' + account.username, 'Exito')
      }
    });
  }

  mensaje(message: string, action: string) {
    this.snackBar.open(message, action, {duration: 5000});
  }

}
