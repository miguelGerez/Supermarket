import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { Category } from '../_model/category';
import { CategoryDTO } from '../_dto/categoriaDTO';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  CategoryCambio = new Subject<Category[]>();
  MensajeCambio = new Subject<string>();

  private url: string = `${environment.HOST}/category`

  constructor(private http: HttpClient) {
  }

  listar() {
    return this.http.get<Category[]>(this.url);
  }

  listarCantidadDeProductsPorId() {
    return this.http.get<CategoryDTO[]>(`${this.url}/quantityPorId`);
  }

  listarPorId(id: number) {
    return this.http.get<Category>(`${this.url}/${id}`);
  }

  listarPorEspecialidad(id: number){
    return this.http.get<Category[]>(`${this.url}/especialidad/${id}`);
  }


  registrar(Category: Category) {
    return this.http.post(this.url, Category);
  }

  modificar(Category?: Category) {
    return this.http.put(this.url, Category);
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

  setCategoryCambio(lista: Category[]){
    this.CategoryCambio.next(lista);
  }

  getCategoryCambio(){
    return this.CategoryCambio.asObservable();
  }
}
