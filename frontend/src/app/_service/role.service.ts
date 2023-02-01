import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Role } from '../_model/role';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private RoleCambio = new Subject<Role[]>();
  private MensajeCambio = new Subject<string>();

  private url: string = `${environment.HOST}/role`

  constructor(private http: HttpClient) {
  }

  listar() {
    return this.http.get<Role[]>(this.url);
  }

  ListarSinProgramador() {
    return this.http.get<Role[]>(`${this.url}/listarSinProgramador`);
  }

  listarPorId(id: number) {
    return this.http.get<Role>(`${this.url}/${id}`);
  }

  registrar(Role: Role) {
    return this.http.post(this.url, Role);
  }

  modificar(Role: Role) {
    return this.http.put(this.url, Role);
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

  setRoleCambio(lista: Role[]){
    this.RoleCambio.next(lista);
  }

  getRoleCambio(){
    return this.RoleCambio.asObservable();
  }
}
