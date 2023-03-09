import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { Sale } from '../_model/sale';
import { SaleDetail } from '../_model/saleDetail';
import { saleAnualDTO } from '../_dto/ventaAnualDTO';

@Injectable({
  providedIn: 'root',
})
export class SaleService {
  SaleCambio = new Subject<Sale[]>();
  MensajeCambio = new Subject<string>();
  saleDetail = new Subject<SaleDetail>();

  private offlineSales: Sale[] = [];

  private url: string = `${environment.HOST}/sale`;

  constructor(private http: HttpClient) {
    // Se intenta recuperar las ventas sin enviar desde el almacenamiento local
    const offlineSalesJson = localStorage.getItem('offlineSales');
    if (offlineSalesJson) {
      this.offlineSales = JSON.parse(offlineSalesJson);
    }
  }

  listar() {
    return this.http.get<Sale[]>(this.url);
  }

  quantityDeSales() {
    return this.http.get<number>(`${this.url}/quantityDeSales`);
  }

  listarPorId(id: number) {
    return this.http.get<Sale>(`${this.url}/${id}`);
  }

  listarAnual() {
    return this.http.get<saleAnualDTO[]>(`${this.url}/annual`);
  }

  listarPorEspecialidad(id: number) {
    return this.http.get<Sale[]>(`${this.url}/especialidad/${id}`);
  }

  listByDate(date: string) {
    return this.http.get<Sale[]>(`${this.url}/listByDate/${date}`);
  }

  registrar(sale: Sale): Observable<Sale> {
    // Si hay conexión a internet, se envía la venta al backend
    return this.http.post<Sale>(this.url, sale).pipe(
      catchError((error) => {
        this.offlineSales.push(sale);
        localStorage.setItem('offlineSales', JSON.stringify(this.offlineSales));
        console.log(error)
        return new Observable<Sale>();
      })
    );
    }

  enviarVentasOffline(): void {
    if (navigator.onLine && this.offlineSales.length > 0) {
      // Si hay conexión a internet y hay ventas sin enviar, se intentan enviar al backend
      this.http
        .post<Sale[]>(`${this.url}/offline`, this.offlineSales)
        .subscribe(() => {
          // Si se han enviado correctamente, se borran del almacenamiento local
          this.offlineSales = [];
          localStorage.removeItem('offlineSales');
        });
    }
  }

  modificar(Sale?: Sale) {
    return this.http.put(this.url, Sale);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  setMensajeCambio(mensaje: string) {
    this.MensajeCambio.next(mensaje);
  }

  getMensajeCambio() {
    return this.MensajeCambio.asObservable();
  }

  setSaleCambio(lista: Sale[]) {
    this.SaleCambio.next(lista);
  }

  getSaleCambio() {
    return this.SaleCambio.asObservable();
  }

  setDetalle(saleDetail: SaleDetail) {
    this.saleDetail.next(saleDetail);
  }

  getDetalle() {
    return this.saleDetail.asObservable();
  }
}
