import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { Category } from '../_model/category';

@Injectable({
  providedIn: 'root'
})
export class bardCodeService {

  bardCode = new Subject<string>();


  constructor() {
  }


  setBardCode(string: string){
    this.bardCode.next(string);
  }

  getMensajeCambio(){
    return this.bardCode.asObservable();
  }


}
