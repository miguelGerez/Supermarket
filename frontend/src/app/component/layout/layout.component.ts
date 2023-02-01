import { ThermalPrintService } from './../../_service/thermalPrint.service';
import { Route, Router } from '@angular/router';
import { LayoutService } from './../../_service/layout.service';
import { Account } from 'src/app/_model/account';
import { MatDialog } from '@angular/material/dialog';
import { Sale } from 'src/app/_model/sale';
import { SaleService } from 'src/app/_service/sale.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { delay } from 'rxjs/operators';
import { Menu } from 'src/app/_model/menu';
import { LoadingService } from 'src/app/_service/loading.service';
import { LoginService } from 'src/app/_service/login.service';
import { MenuService } from 'src/app/_service/menu.service';
import { AccountService } from 'src/app/_service/account.service';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import { SaleDetalleComponent } from 'src/app/pages/point-of-sale/saleDetail/saleDetail.component';
import { FormControl } from '@angular/forms';
import { ThemeService } from 'src/app/_service/theme.service';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {


  combinedCode = null

  loading: boolean = false;
  menus: Menu[];
  account: string;
  status!: boolean;
  sales!: Sale[];

  date = new Date;
  title!: string;

  lightness = new FormControl(false);

  constructor(
    private menuService: MenuService,
    public loginService: LoginService,
    private accountService: AccountService,
    private _loading: LoadingService,
    private SaleService: SaleService,
    private _dialog: MatDialog,
    private service: ThemeService,
    private router: Router,
    private titleService: Title,
    private _thermalPrintService: ThermalPrintService
  ) { }

  ngDoCheck() {
    this.title = this.titleService.getTitle();
  }

  ngOnInit(): void {
    console.log(localStorage.getItem('selectedDriver'))
    moment.locale('es-mx');

    this.lightness.valueChanges
      .subscribe(x => this.service.lightness = x);

    this.service.$lightness.subscribe(x => {
      this.lightness.setValue(x);
      this.lightness.updateValueAndValidity();
    });

    this.lightness.updateValueAndValidity();






    this.listenToLoading();

    this.menuService.getMenuCambio().subscribe(data => {
      this.menus = data;
    });

    const helper = new JwtHelperService();
    let token = sessionStorage.getItem(environment.TOKEN_NAME);

    const decodedToken = helper.decodeToken(token);
    this.account = decodedToken.user_name;

    this.accountService.findOneByAccountname(this.account).subscribe((data: Account) => {
      //this.accountService.setAccountActivo(data);
      localStorage.setItem('currentUser', JSON.stringify(data));

    })

    this.menuService.listarPorAccount(this.account).subscribe(data => {
      this.menuService.setMenuCambio(data);
    });

  }


  listenToLoading(): void {
    this._loading.loadingSub
      .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
      .subscribe((loading) => {
        this.loading = loading;
      });
  }

  moment(date: string) {
    return moment(date).format('LTS');
  }

  dialogProduct(sell: Sale) {
    this._dialog.open(SaleDetalleComponent, {
      data: sell
    })
  }

  listSell() {
    this.SaleService.listByDate(moment(this.date).format('YYYY-MM-DD')).subscribe(data => {
      if (data) {
        this.sales = data
      }
    })
  }

  routeProfile() {
    const account = JSON.parse(localStorage.getItem('currentUser'));
    this.accountService.setAccountEdition(account)
    this.router.navigateByUrl("pages/perfil")
  }

  print() {
    //this._thermalPrintService.print();
  }

  requestUsb() {
    this._thermalPrintService.requestUsb();
  }


}
