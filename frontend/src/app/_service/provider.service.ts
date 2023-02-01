import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { Provider } from '../_model/provider';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {
  ProviderEdicion: Provider;
  ProviderCambio = new Subject<Provider[]>();
  MensajeCambio = new Subject<string>();

  private url: string = `${environment.HOST}/provider`

  constructor(private http: HttpClient) {
  }

  listar() {
    return this.http.get<Provider[]>(this.url);
  }

  listarProductPorProvider(id: number) {
    return this.http.get<Provider[]>(`${this.url}/proovedor/${id}`);
  }

  listarCantidadDeProductsPorId(id: number) {
    return this.http.get<number>(`${this.url}/quantityPorId/${id}`);
  }

  listarPorId(id: number) {
    return this.http.get<Provider>(`${this.url}/${id}`);
  }

  registrar(Category: Provider) {
    return this.http.post(this.url, Category);
  }

  modificar(Category?: Provider) {
    return this.http.put(this.url, Category);
  }

  eliminar(id: number){
    return this.http.delete(`${this.url}/${id}`);
  }


}
