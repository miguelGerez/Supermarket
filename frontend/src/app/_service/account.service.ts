import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Account } from '../_model/account';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private AccountActivo: Account;
  private accountEdition: Account;
  AccountCambio = new Subject<Account[]>();
  MensajeCambio = new Subject<string>();
  //AccountActivo = new Subject<Account>();

  private url: string = `${environment.HOST}/account`

  constructor(private http: HttpClient) {
  }

  listar() {
    return this.http.get<Account[]>(this.url);
  }

  listarPorId(id: number) {
    return this.http.get<Account>(`${this.url}/${id}`);
  }


  registrar(Account: Account) {
    return this.http.post(this.url, Account);
  }

  modificar(Account: Account) {
    return this.http.put(this.url, Account);
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

  setAccountCambio(lista: Account[]){
    this.AccountCambio.next(lista);
  }

  getAccountCambio(){
    return this.AccountCambio.asObservable();
  }


  setAccountActivo(account: Account){
    //this.AccountActivo.next(account);
    this.AccountActivo = account
  }

  getAccountActivo(){
    return this.AccountActivo
    //this.AccountActivo.asObservable();
  }

  guardarArchivo(data: File){ //medico: Medico,
    let formdata: FormData = new FormData();
    formdata.append('adjunto', data);
    //const medicoBlob = new Blob([JSON.stringify(medico)], { type: "application/json" });
    //formdata.append('medico', medicoBlob);
    return this.http.post(`${this.url}/guardarArchivo`, formdata);
  }

  leerArchivo() {
    return this.http.get(`${this.url}/leerArchivo/1`, {
      responseType: 'blob'
    });
  }

  findOneByAccountname(string: string){
    return this.http.get(`${this.url}/username/${string}`);
  }

  setAccountEdition(account: Account){
    this.accountEdition = account
  }

  getAccountEdition(){
    return this.accountEdition;
  }

}
