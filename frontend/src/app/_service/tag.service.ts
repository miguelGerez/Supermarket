import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Product } from '../_model/product';
import { Tag } from '../_model/tag';

@Injectable({
  providedIn: 'root'
})
export class TagService {


  private url: string = `${environment.HOST}/tag`

  constructor(private http: HttpClient) {
  }

  listar() {
    return this.http.get<Tag[]>(this.url);
  }

  listarCantidadDeProductsPorId(id: number) {
    return this.http.get<number>(`${this.url}/quantityPorTag/${id}`);
  }

  listaretiquetaSinImprimir() {
    return this.http.get<Tag>(`${this.url}/etiquetaSinImprimir/`);
  }

  ListarImpresas() {
    return this.http.get<Tag[]>(`${this.url}/impresas/`);
  }


  listarPorId(id: number) {
    return this.http.get<Tag>(`${this.url}/${id}`);
  }

  listarPorEspecialidad(id: number){
    return this.http.get<Tag[]>(`${this.url}/especialidad/${id}`);
  }

  productATag(product: Product) {
    return this.http.post(`${this.url}/productATag/`, product);
  }

  registrar(Tag: Tag) {
    return this.http.post(this.url, Tag);
  }

  modificar(Tag?: Tag) {
    return this.http.put(this.url, Tag);
  }

  eliminar(id: number){
    return this.http.delete(`${this.url}/${id}`);
  }

}
