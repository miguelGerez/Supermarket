import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/_service/login.service';
import { environment } from 'src/environments/environment';

//import '../../../assets/login-animation.js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  account: string;
  clave: string;
  mensaje: string;
  error: string;

  isLoading = false;

  public showPassword: boolean = false;

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  iniciarSesion() {

    this.loginService.login(this.account, this.clave).subscribe(
      (data) => {
        sessionStorage.setItem(environment.TOKEN_NAME, data.access_token);
        sessionStorage.setItem(environment.REFRESH_TOKEN, data.refresh_token);
        this.router.navigate(['pages']);
        this.isLoading = false;
      },
    );
  }
  /*
  ngAfterViewInit() {
    (window as any).initialize();
  }
  */
}
