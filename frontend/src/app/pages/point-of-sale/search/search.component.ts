import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Product } from 'src/app/_model/product';
import { ProductService } from 'src/app/_service/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  autoCompleteList!: Observable<Product[]>;
  stateCtrl = new FormControl('');
  @Output() producto = new EventEmitter<Product>();

  constructor(private productService: ProductService){}

  ngOnInit(){
    this.stateCtrl.valueChanges.subscribe(data => {
      this.autoComplete(data)
    })
  }

  limpiarAutocompletado() {
    this.autoCompleteList = new Observable<Product[]>();
  }

  autoComplete(string: string) {
    if (string?.length > 4) {
      this.autoCompleteList = this.productService.autoComplete(string);

    }

  }

  addProduct(product: Product){
    this.producto.emit(product)
  }
}
