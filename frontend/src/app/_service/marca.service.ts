import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { Brand } from '../_model/brand';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  BrandCambio = new Subject<Brand[]>();
  MensajeCambio = new Subject<string>();

  private url: string = `${environment.HOST}/brand`

  constructor(private http: HttpClient) {
  }

  listar() {
    return this.http.get<Brand[]>(this.url);
  }

  listarCantidadDeProductsPorId(id: number) {
    return this.http.get<number>(`${this.url}/quantityPorBrand/${id}`);
  }

  listarPorId(id: number) {
    return this.http.get<Brand>(`${this.url}/${id}`);
  }

  listarPorEspecialidad(id: number){
    return this.http.get<Brand[]>(`${this.url}/especialidad/${id}`);
  }

  registrar(Brand: Brand) {
    return this.http.post(this.url, Brand);
  }

  modificar(Brand?: Brand) {
    return this.http.put(this.url, Brand);
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

  setBrandCambio(lista: Brand[]){
    this.BrandCambio.next(lista);
  }

  getBrandCambio(){
    return this.BrandCambio.asObservable();
  }
}
