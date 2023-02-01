import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/_model/product';
import { ProductService } from 'src/app/_service/product.service';
import * as printJS from 'print-js';
import * as es6printJS from "print-js";
import { TagService } from 'src/app/_service/tag.service';
import { MensajeService } from 'src/app/_service/mensajes.service';
import { WINDOW } from 'src/app/_service/windows.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Tag } from 'src/app/_model/tag';
import { MatDialog } from '@angular/material/dialog';
import { TagsHistorialComponent } from './etiquetas-historial/etiquetas-historial.component';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-etiquetas',
  templateUrl: './etiquetas.component.html',
  styleUrls: ['./etiquetas.component.css']
})
export class TagsComponent implements OnInit {
  etiqueta!: Tag
  tabs = [];
  boolean: boolean = true;
  autoCompleteList!: Observable<Product[]>;

  stateCtrl = new FormControl('');


  constructor(
    private productService: ProductService,
    private etiquetaService: TagService,
    private mensajeService: MensajeService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog) { }



  ngOnInit(): void {
    this.etiqueta = new Tag as Tag
    this.stateCtrl.valueChanges.subscribe(data => {
      this.autoComplete(data)
    })


    this.listarSinImprimir()
  }

  printTest() {
    es6printJS({ printable: 'test', type: 'html', targetStyles: ['*'], targetStyle: ['*'], font_size: '', documentTitle: 'etiquetas' });
  }



  finalizar() {
    this.etiqueta.print = true;
    this.etiquetaService.modificar(this.etiqueta).subscribe(() => {
      this.mensajeService.mensaje('Guardado correctamente', 'info')
      this.listarSinImprimir()
    });
  }

  EliminarTag(product: Product) {

    const index = this.etiqueta.products.indexOf(product)
    const d = this.etiqueta.products
    d.splice(index, 1)
    this.etiqueta.products = d
  }

  save(){
    this.etiquetaService.modificar(this.etiqueta).subscribe(()=>{
      this.mensajeService.mensaje("Guardado correctamente", 'info')
    })
  }

  autoComplete(string: string) {
    if (string?.length > 4) {
      this.autoCompleteList = this.productService.autoComplete(string);
    }
  }

  agregarProduct(product: Product) {
    if (this.etiqueta.products){
      this.etiqueta.products.push(product)
    }
    else{
      this.etiqueta.products = [product]
    }
  }

  listarSinImprimir() {
    this.etiquetaService.listaretiquetaSinImprimir().subscribe(data => {
      data ? this.etiqueta = data : this.etiqueta = new Tag();
      //this.etiqueta.products = new Array<Product>
    })
  }

}

