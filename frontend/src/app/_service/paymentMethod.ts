import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { PaymentMethod } from '../_model/paymentMethod';

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService {

  PaymentMethodCambio = new Subject<PaymentMethod[]>();
  MensajeCambio = new Subject<string>();

  private url: string = `${environment.HOST}/paymentMethod`

  constructor(private http: HttpClient) {
  }

  listar() {
    return this.http.get<PaymentMethod[]>(this.url);
  }

  listarPorId(id: number) {
    return this.http.get<PaymentMethod>(`${this.url}/${id}`);
  }

  listarPorEspecialidad(id: number){
    return this.http.get<PaymentMethod[]>(`${this.url}/especialidad/${id}`);
  }


  registrar(PaymentMethod: PaymentMethod) {
    return this.http.post(this.url, PaymentMethod);
  }

  modificar(PaymentMethod?: PaymentMethod) {
    return this.http.put(this.url, PaymentMethod);
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

  setPaymentMethodCambio(lista: PaymentMethod[]){
    this.PaymentMethodCambio.next(lista);
  }

  getPaymentMethodCambio(){
    return this.PaymentMethodCambio.asObservable();
  }
}
