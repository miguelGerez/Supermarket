import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/_model/product';
import { ProductService } from 'src/app/_service/product.service';

@Component({
  selector: 'app-product-generico',
  templateUrl: './producto-generico.component.html',
  styleUrls: ['./producto-generico.component.css']
})

export class ProductGenericoComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<ProductGenericoComponent>,
    @Inject(MAT_DIALOG_DATA) public product: Product,
    private productService: ProductService,
) { }

  ngOnInit(): void {
      //this.product = new Product
      //this.product.id = 1;

  }

  SendProduct(){
    this.productService.setProductGenerico(this.product)
    this.dialogRef.close()
  }

}
