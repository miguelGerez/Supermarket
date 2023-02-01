import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { Category } from '../_model/category';
import { compreMasDTO } from '../_dto/compreMasDTO';

@Injectable({
  providedIn: 'root'
})
export class compreAhoraService {

  bardCode = new Subject<string>();

  private url: string = `https://search.unbxd.io/f431b25f355b5b5d80866040fb4b216c/ss-unbxd-prod-argentina823111637044756/search?q=AR`

  constructor(private http: HttpClient) {
  }



  listBardCode(string: string) {
    return this.http.get<compreMasDTO>(this.url + string);
  }


}
