import { Stock } from './../_model/stock';
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class StockService{
  private url: string = `${environment.HOST}/stock`

  constructor(private http: HttpClient) {
  }

  listByProduct(id: number){
    return this.http.get<Stock>(`${this.url}/listByProduct/${id}`)
  }
}
