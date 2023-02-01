import { Router } from '@angular/router';
import { ProductService } from 'src/app/_service/product.service';
import { Product } from 'src/app/_model/product';
import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-bard-code-sin-product',
  templateUrl: './bard-code-sin-producto.component.html',
  styleUrls: ['./bard-code-sin-producto.component.css'],


})
export class  BardCodeSinProductComponent implements OnInit {

  constructor(public snackBarRef: MatSnackBarRef<BardCodeSinProductComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
  private productService: ProductService,
  private router: Router) { }

  ngOnInit(): void {
  }

  openProduct(){
    let product = new Product
    product.bard_code = this.data
    this.productService.productEdicion = product
    this.router.navigateByUrl('pages/inventario/producto')
  }

}
