import { Router } from '@angular/router';
import { environment } from './../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { tap, catchError, retry } from 'rxjs/operators';
import { LoadingService } from '../_service/loading.service';

@Injectable({
    providedIn: 'root'
})
export class ServerErrorsInterceptor implements HttpInterceptor {

    constructor(private snackBar: MatSnackBar, private router : Router,
      private _loading: LoadingService
      ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      this._loading.setLoading(true, request.url);
        return next.handle(request).pipe()
            .pipe(tap(event => {

                if (event instanceof HttpResponse) {

                  this._loading.setLoading(false, request.url);

                    if (event.body && event.body.error === true && event.body.errorMessage) {
                        throw new Error(event.body.errorMessage);
                    }/*else{
                        this.snackBar.open("EXITO", 'AVISO', { duration: 5000 });
                    }*/
                }
            })).pipe(catchError((err) => {
              this._loading.setLoading(false, request.url);
                //https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
                if (err.status === 400) {
                    this.snackBar.open(err.message, 'ERROR 400', { duration: 5000 });
                }
                else if (err.status === 404){
                    this.snackBar.open(err.error.mensaje, 'ERROR 404', { duration: 5000 });
                }
                else if (err.status === 403 || err.status === 401) {
                    console.log(err);
                    this.snackBar.open(err.error.error_description, 'ERROR 403', { duration: 5000 });
                    sessionStorage.clear();
                    this.router.navigate(['/login']);
                }
                else if (err.status === 500) {
                    this.snackBar.open(err.error.mensaje, 'ERROR 500', { duration: 5000 });
                    console.log(err)
                } else {
                    this.snackBar.open('Verifique su conexion con el servidor', 'ERROR', { duration: 5000 });
                    //err.error.mensaje
                  console.log(err)
                }
                return EMPTY;
            }));
    }
}
