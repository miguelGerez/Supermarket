import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { delay } from 'rxjs/operators';
import { Brand } from 'src/app/_model/brand';
import { LoadingService } from 'src/app/_service/loading.service';
import { BrandService } from 'src/app/_service/marca.service';

@Component({
  selector: 'app-brand-edition',
  templateUrl: './brand-edition.component.html',
  styleUrls: ['./brand-edition.component.css']
})
export class BrandEditionComponent implements OnInit {

  formGroup!: FormGroup;
  brand =  new Brand;
  modificar!: Boolean;


  loading: boolean = false;


  constructor(public dialogRef: MatDialogRef<BrandEditionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Brand,
    private brandService: BrandService,
    private formBuilder: FormBuilder,
    private _loading: LoadingService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.listenToLoading()

    this.Form();
    if (this.data) {
      this.brand = { ...this.data };
      this.modificar = true;
    } else {
      this.modificar = false;
    }
    this.Form();
  }

  Form() {
    this.formGroup = this.formBuilder.group({
      name: [this.brand.name, Validators.required],
    })

  }
  operar(){
    let brand: Brand = this.formGroup.value as Brand;
    if (!this.modificar){
      this.brandService.registrar(brand).subscribe(()=>{
        this.dialogRef.close();
        this.brandService.setMensajeCambio('Se agrego la brand' + ' ' + brand.name)
        this.ListarCambio();
      }
      );
    }
    else if(this.modificar){
      brand.id = this.brand.id;
      this.brandService.modificar(brand).subscribe(()=>{
        this.dialogRef.close();
        this.brandService.setMensajeCambio('Se modifico la brand' + ' ' + brand.name)
        this.ListarCambio();
      })
    }

  }

  ListarCambio(){
    this.brandService.listar().subscribe(data=>{
      this.brandService.setBrandCambio(data)

    })
  }

  mensaje(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000
    });
  }

  listenToLoading(): void {
    this._loading.loadingSub
      .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
      .subscribe((loading) => {
        this.loading = loading;
      });
  }

}
