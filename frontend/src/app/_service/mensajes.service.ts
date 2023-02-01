import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { Category } from '../_model/category';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BardCodeSinProductComponent } from '../component/snackBar/bard-code-sin-producto/bard-code-sin-producto.component';

@Injectable({
  providedIn: 'root',

})
export class MensajeService {

  constructor(private snackBar: MatSnackBar) {
  }

  mensaje(string: string, type?: string){
    this.snackBar.openFromComponent(BardCodeSinProductComponent, {
      duration: 5000,
      data: string,
      panelClass: [type],
    },);

  }


}
