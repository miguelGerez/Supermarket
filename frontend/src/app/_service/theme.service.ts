import { Subject, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


declare var Sass;

@Injectable({
  providedIn: 'root'
})
export class ThemeService {


  $lightness = new Subject<boolean>();
  lightness = true;


  constructor(private http: HttpClient) {

  }

  loadThemingScss() {
    return this.http.get('/assets/angular_11_theming.scss', { responseType: 'text' })
      .pipe(
        map(x => {
          return x
            .replace(/\n/gm, '??')
            .replace(/\$mat-([^:?]+)\s*:\s*\([? ]*50:[^()]*contrast\s*:\s*\([^)]+\)[ ?]*\);\s*?/g,
              (all, name) => name === 'grey' ? all : '')
            .replace(/\/\*.*?\*\//g, '')
            .split(/[?][?]/g)
            .map(l => l
              .replace(/^\s*(\/\/.*)?$/g, '')
              .replace(/^\$mat-blue-gray\s*:\s*\$mat-blue-grey\s*;\s*/g, '')
              .replace(/^\s*|\s*$/g, '')
              .replace(/:\s\s+/g, ': ')
            )
            .filter(l => !!l)
            .join('\n');
        }),
        map(txt =>
          Sass.writeFile('~@angular/material/theming', txt))
      ).toPromise();
  }







}
