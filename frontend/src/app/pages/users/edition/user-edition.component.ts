import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Category } from 'src/app/_model/category';
import { Role } from 'src/app/_model/role';
import { Account } from 'src/app/_model/account';
import { CategoryService } from 'src/app/_service/category.service';
import { RoleService } from 'src/app/_service/role.service';
import { AccountService } from 'src/app/_service/account.service';

@Component({
  selector: 'app-account-edicion',
  templateUrl: './user-edition.component.html',
  styleUrls: ['./user-edition.component.css'],
})
export class AccountEditionComponent implements OnInit {
  account: Account = new Account;
  role$!: Observable<Role[]>;
  category$!: Observable<Category[]>;
  formGroup: FormGroup;
  modificar!: Boolean;
  nameArchivo: string;


  archivosSeleccionados: FileList;

  activeColor: string = 'green';
  baseColor: string = '#ccc';
  overlayColor: string = 'rgba(255,255,255,0.5)';

  dragging: boolean = false;
  loaded: boolean = false;
  imageLoaded: boolean = false;
  imageSrc: string = '';

  constructor(
    public dialogRef: MatDialogRef<AccountEditionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Account,
    private roleService: RoleService,
    private categoryService: CategoryService,
    private accountService: AccountService,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,

  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.account = { ...this.data };
      this.modificar = true;
    } else {
      this.modificar = false;
    }
    this.Form();
    this.listar();
  }

  Form() {
    this.formGroup = this.formBuilder.group({
      name: [this.account.username],
      last_name: [this.account.last_name],
      phone: [this.account.phone],
      email: [this.account.email],
      address: [this.account.address],
      height: [this.account.height],
      username: [this.account.username],
      password: [this.account.password],
      enabled: [this.account.enabled],
      roles: [this.account.roles],
      category: [this.account.category],


    })
  }

  operar() {

    let account: Account = this.formGroup.value as Account;
    if (this.formGroup.status == "VALID") {

      if (this.modificar) {
        account.id = this.account.id;
        this.accountService.modificar(account).subscribe(()=>{
          this.accountService.setMensajeCambio('Se modifico al usuario' + account.username);
          this.ListarCambio();
          this.dialogRef.close();
        })
      } else {
        this.account.enabled = true;
        this.accountService.registrar(account).subscribe(() => {
          this.accountService.setMensajeCambio('Se registro al usuario' + account.username);
          this.ListarCambio();
          this.dialogRef.close();
        })

      }

    }else{
      this.mensaje('Complete todos los datos','')
    }
  }


  listar() {
    this.role$ = this.roleService.ListarSinProgramador();
    this.category$ = this.categoryService.listar();
  }

  compareObjects(o1: any, o2: any): boolean {

    return (
      o1.id === o2.id &&
      o1.id === o2.id
    );
  }

  mensaje(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }

  ListarCambio(){
    this.accountService.listar().subscribe(data=>{
      this.accountService.setAccountCambio(data)
    })
  }

  subirArchivo(){
    this.accountService.guardarArchivo(this.archivosSeleccionados.item(0)).subscribe();
  }

  seleccionarArchivo(e: any) {
    this.nameArchivo = e.target.files[0].name;
    this.archivosSeleccionados = e.target.files;
  }


  }

