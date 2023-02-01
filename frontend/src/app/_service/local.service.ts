import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { Local } from '../_model/local';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  LocalCambio = new Subject<Local[]>();
  MensajeCambio = new Subject<string>();

  private url: string = `${environment.HOST}/local`

  constructor(private http: HttpClient) {
  }

  listar() {
    return this.http.get<Local[]>(this.url);
  }

  listarPorId(id: number) {
    return this.http.get<Local>(`${this.url}/${id}`);
  }


  registrar(Local: Local) {
    return this.http.post(this.url, Local);
  }

  modificar(Local?: Local) {
    return this.http.put(this.url, Local);
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

  setLocalCambio(lista: Local[]){
    this.LocalCambio.next(lista);
  }

  getLocalCambio(){
    return this.LocalCambio.asObservable();
  }
}
