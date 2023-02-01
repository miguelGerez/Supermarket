import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { Sale } from '../_model/sale';
import { SaleDetail } from '../_model/saleDetail';
import { saleAnualDTO } from '../_dto/ventaAnualDTO';

@Injectable({
  providedIn: 'root'
})
export class SaleService {


  SaleCambio = new Subject<Sale[]>();
  MensajeCambio = new Subject<string>();
  saleDetail = new Subject<SaleDetail>();

  private url: string = `${environment.HOST}/sale`

  constructor(private http: HttpClient) {
  }

  listar() {
    return this.http.get<Sale[]>(this.url);
  }

  quantityDeSales(){
    return this.http.get<number>(`${this.url}/quantityDeSales`);
  }

  listarPorId(id: number) {
    return this.http.get<Sale>(`${this.url}/${id}`);
  }

  listarAnual() {
    return this.http.get<saleAnualDTO[]>(`${this.url}/annual`);
  }

  listarPorEspecialidad(id: number){
    return this.http.get<Sale[]>(`${this.url}/especialidad/${id}`);
  }

  listByDate(date: string){
    return this.http.get<Sale[]>(`${this.url}/listByDate/${date}`);
  }


  registrar(Sale: Sale) {
    return this.http.post<Sale>(this.url, Sale);
  }

  modificar(Sale?: Sale) {
    return this.http.put(this.url, Sale);
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

  setSaleCambio(lista: Sale[]){
    this.SaleCambio.next(lista);
  }

  getSaleCambio(){
    return this.SaleCambio.asObservable();
  }

  setDetalle(saleDetail: SaleDetail){
    this.saleDetail.next(saleDetail);
  }

  getDetalle(){
    return this.saleDetail.asObservable();
  }
}
