import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Product } from '../_model/product';
import { Observable, of, Subject } from 'rxjs';
import { shareReplay, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productGenerico = new Subject<Product>();
  productEdicion: Product;
  ProductCambio = new Subject<Product[]>();
  MensajeCambio = new Subject<string>();
  private products$: Observable<Product[]>;

  private url: string = `${environment.HOST}/product`

  constructor(private http: HttpClient) {
  }

  private cache = new Map<string, Product[]>();

  list(): Observable<Product[]> {
    if (this.cache.has('products')) {
      return of(this.cache.get('products'));
    } else {
      return this.http.get<Product[]>(this.url)
        .pipe(
          tap(products => this.cache.set('products', products))
        );
    }
  }


  listarPorId(id: number) {
    return this.http.get<Product>(`${this.url}/${id}`);
  }

  listarProductPorSinPrecio(){
    return this.http.get<Product[]>(`${this.url}/listarProductPorSinPrecio/`);
  }

  Autocomplete(string: string){
    return this.http.get<Product[]>(`${this.url}/autocomplete/${string}`);
  }

  listarProductPorProvider(id: number){
    return this.http.get<Product[]>(`${this.url}/proovedor/${id}`);
  }

  exportarExcel(){
    return this.http.get<any>(`${this.url}/exportarExcel/`, {responseType: 'arraybuffer' as 'json' });
  }

  listarPorEspecialidad(id: number){
    return this.http.get<Product[]>(`${this.url}/especialidad/${id}`);
  }

  ListarPorBrand(id: number){
    return this.http.get<Product[]>(`${this.url}/brand/${id}`);
  }

  ListarPorCategory(id: number){
    return this.http.get<Product[]>(`${this.url}/category/${id}`);
  }

  listByQuickAccess() {
    return this.http.get<Product[]>(`${this.url}/quick_access/`);
  }

  autoComplete(string: string){
    return this.http.get<Product[]>(`${this.url}/autocomplete/${string}`);
  }

  listarPorCategoryYBrand(idBrand: number, idCategory: number){
    return this.http.get<Product[]>(`${this.url}/brand/${idBrand}/category/${idCategory}`);
  }

  listarProductPorBar_code(string: string){
    return this.http.get<Product>(`${this.url}/bard_code/${string}`).pipe(take(1));
  }

  registroMasico(Products: Product[]){
    return this.http.post<Boolean>(`${this.url}/registroMasivo/`, Products);
  }

  registrar(Product: Product) {
    return this.http.post(this.url, Product);
  }

  modificar(Product?: Product) {
    return this.http.put(this.url, Product);
  }

  eliminar(id: number){
    return this.http.delete(`${this.url}/${id}`);
  }

  setMensajeCambio(mensaje: string){
    this.MensajeCambio.next(mensaje);
  }

  getMensajeCambio(){
    return this.MensajeCambio.asObservable();
  }

  setProductCambio(lista: Product[]){
    this.ProductCambio.next(lista);
  }

  getProductCambio(){
    return this.ProductCambio.asObservable();
  }
  setProductGenerico(product: Product){
    this.productGenerico.next(product);
  }

  getProductGenerico(){
    return this.productGenerico.asObservable();
  }


}
