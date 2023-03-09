import { ProviderService } from 'src/app/_service/provider.service';
import { Provider } from 'src/app/_model/provider';
import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edition',
  templateUrl: './edition.component.html',
  styleUrls: ['./edition.component.css']
})
export class EditionComponent {
  provider!: Provider;
  formGroup: FormGroup;

  constructor(public _dialogRef: MatDialogRef<EditionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Provider,
    private _formBuilder: FormBuilder,
    private _providerService: ProviderService
    ){

  }
  ngOnInit(){
    this.provider = {...this.data}
    this.Form()
  }
  Form() {

    this.formGroup = this._formBuilder.group({
      id: [this.provider.id],
      name: [this.provider.name, Validators.required],
      phone: [this.provider.phone],
      mail: [this.provider.mail]
    })
  }

  operar(){
    this.provider = this.formGroup.value as Provider;
    if(this.data){
      this._providerService.modificar(this.provider).subscribe(()=>{
      this._dialogRef.close();
      this.ListarCambio();
      })
    }
    else{
      this._providerService.registrar(this.provider).subscribe(()=>{
        this._dialogRef.close();
        this.ListarCambio();
      })

    }
  }

  ListarCambio(){
    this._providerService.listar().subscribe(data=>{
      this._providerService.setProviderCambio(data)

    })
  }

}
