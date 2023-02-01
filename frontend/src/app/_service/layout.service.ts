import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  title = new Subject<string>();

  setTitle(mensaje: string){
    this.title.next(mensaje);
  }

  getTitle(){
    return this.title.asObservable();
  }
}
