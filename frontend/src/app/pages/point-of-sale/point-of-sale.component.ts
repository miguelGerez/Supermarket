import { ThermalPrintService } from './../../_service/thermalPrint.service';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { PaymentMethod } from 'src/app/_model/paymentMethod';
import { Product } from 'src/app/_model/product';
import { Sale } from 'src/app/_model/sale';
import { SaleDetail } from 'src/app/_model/saleDetail';
import { Account } from 'src/app/_model/account';
import { LoadingService } from 'src/app/_service/loading.service';
import { PaymentMethodService } from 'src/app/_service/paymentMethod';
import { ProductService } from 'src/app/_service/product.service';
import { SaleService } from 'src/app/_service/sale.service';
import { bardCodeService } from 'src/app/_service/bardCode.service';
import AOS from "aos";

import { SaleDetailComponent } from './sale/detalle/saleDetail.component';
import { ProductGenericoComponent } from './sale/producto-generico/producto-generico.component';
import { AccountService } from 'src/app/_service/account.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-point-of-sale',
  templateUrl: './point-of-sale.component.html',
  styleUrls: ['./point-of-sale.component.css']
})
export class PointOfSaleComponent {
  myControl = new FormControl('');
  account!: Account;
  bard_code!: string;
  unidades!: number;
  totalPorUnidad!: number;
  total: number = 0;
  saleDetail!: SaleDetail[];

  showFiller = false;

  ProductsDeRapidoAcceso!: Product[]
  loading: boolean = false;

  //vuelto en efectivo
  ingreso!: number;
  vuelto: number;

  listaDePaymentMethod!: PaymentMethod[];
  paymentMethod!: PaymentMethod

  dataSource = new MatTableDataSource<SaleDetail>();
  displayedColumns: string[] = ['product', 'brand', 'quantity', 'priceUnidad', 'total'];

  bardCode: string;
  barCodeSubscription: Subscription;
  barCodeObservable$: Observable<string>



  constructor(
    private productService: ProductService,
    private snackBar: MatSnackBar,
    private paymentMethodService: PaymentMethodService,
    private saleService: SaleService,
    private dialog: MatDialog,
    private _loading: LoadingService,
    private bardCodeService: bardCodeService,
    private thermalPrint: ThermalPrintService
  ) { }

  ngOnChanges(){
  }
  ngOnInit(): void {
    this.subscribeToBarCode();
    AOS.init();
    this.ListarProductsDeAccesoRapido()
    this.listenToLoading();

/*
    this.accountService.getAccountActivo().subscribe(data => {
      this.account = data
      console.log(data)
    })


*/

    const groupBy = (data, keyFn) => data.reduce((agg, item) => {
      const group = keyFn(item);
      agg[group] = [...(agg[group] || []), item];
      return agg;
    }, {});


    this.paymentMethodService.listar().subscribe(data => {
      this.listaDePaymentMethod = data
    })

    this.productService.getProductGenerico().subscribe(data => {
      this.agregarProduct(data)
    })

    this.saleService.getDetalle().subscribe(data => {
      this.addDetailInTable(data)
    })

  }


  subscribeToBarCode(): void {
    this.barCodeObservable$ = this.bardCodeService.getMensajeCambio()
    this.barCodeSubscription = this.barCodeObservable$.subscribe(string => { this.onDetected(string) })
  }

  ngOnDestroy(): void {
    this.unsubscribeFromBarCode();
  }

  unsubscribeFromBarCode(): void {
    this.barCodeSubscription.unsubscribe();
  }

  @ViewChild(MatTable) table: MatTable<Product>;
  removeData() {
    this.table.renderRows();
  }


  onDetected(code: string) {
    this.productService
      .listarProductPorBar_code(code)
      .subscribe((data) => {
        if (!data) {
          this.mensaje('No se encontro el product', '');
          this.bard_code = ''
        }
        else {
          this.agregarProduct(data);
        }
      });
  }

  Vuelto() {
    this.vuelto = this.ingreso - this.dataSource.data.map(t => t.price * t.quantity).reduce((acc, value) => acc + value, 0)
  }

  mensaje(message: string, action: string) {
    this.snackBar.open(message, action, { duration: 5000 });
  }

  limpiar() {
    this.dataSource.data = [];
    this.table.renderRows();
    this.total = 0;
    this.vuelto = null;
    this.ingreso = null;
    this.paymentMethod = new PaymentMethod
    this.ListarProductsDeAccesoRapido()
  }

  ListarProductsDeAccesoRapido() {
    this.productService.listByQuickAccess().subscribe(data => {
      this.ProductsDeRapidoAcceso = data
    })
  }

  removerDetalle(saleDetail: SaleDetail) {
    const index = this.dataSource.data.indexOf(saleDetail)
    const d = this.dataSource.data;
    d.splice(index, 1)
    this.dataSource.data = d;
  }

  saleDetailDialog() {
    this.dialog.open(SaleDetailComponent);
  }

  agregarProduct(product: Product) {
    const existingProduct = this.dataSource.data.find(detail => detail.product.id === product.id);
    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      const saleDetail = new SaleDetail();
      saleDetail.product = product;
      saleDetail.price = product.salePrice;
      saleDetail.quantity = 1;
      this.dataSource.data.push(saleDetail);
    }
    this.dataSource._updateChangeSubscription();
    this.bard_code = null;
  }

  addDetailInTable(saleDetail: SaleDetail) {
    const d = this.dataSource.data;
    saleDetail.quantity = 1;
    d.push(saleDetail);
    this.dataSource.data = d;
  }


  getTotalCost() {
    return this.dataSource.data.map(t => t.price * t.quantity).reduce((acc, value) => acc + value, 0);
  }



  //funcion que suma o resta la quantity de product
  quantity(number: number, item: SaleDetail) {

    if (number === 1) {

      let carrito: SaleDetail[]
      //data[elemento] suma la quantity
      this.dataSource[this.saleDetail.findIndex(d => d === item)].quantity++
    }
    else if (number === -1) {
      this.dataSource[this.saleDetail.findIndex(d => d === item)].quantity--
    }

  }

  Sale() {
    let sale = new Sale;
    sale.saleDetail = this.dataSource.data;
    sale.paymentMethod = this.paymentMethod;
    sale.account = JSON.parse(localStorage.getItem('currentUser'));
    this.saleService.registrar(sale).subscribe(data => {
      this.limpiar();
      this.mensaje('Venta realizada con exito', '')
      this.thermalPrint.print(data)

    })
  }

  ProductGenericoDialog(product?: Product) {
    if (product?.salePrice) {
      this.agregarProduct(product)
    }
    else {
      this.ListarProductsDeAccesoRapido();
      this.dialog.open(ProductGenericoComponent, {
        data: product
      })
    }

  }

  listenToLoading(): void {
    this._loading.loadingSub
      .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
      .subscribe((loading) => {
        this.loading = loading;
      });
  }




}
