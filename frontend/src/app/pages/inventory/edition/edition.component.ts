import { Component, HostListener, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subscription } from 'rxjs';
import { Category } from 'src/app/_model/category';
import { Brand } from 'src/app/_model/brand';
import { Product } from 'src/app/_model/product';
import { CategoryService } from 'src/app/_service/category.service';
import { ProductService } from 'src/app/_service/product.service';
import { delay, map } from 'rxjs/operators';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Location } from '@angular/common';
import { LoadingService } from 'src/app/_service/loading.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import { bardCodeService } from 'src/app/_service/bardCode.service';
import { MensajeService } from 'src/app/_service/mensajes.service';
import { compreAhoraService } from 'src/app/_service/compreAhora.service';
import { Provider } from 'src/app/_model/provider';
import { ProviderService } from 'src/app/_service/provider.service';
import { TagService } from 'src/app/_service/tag.service';
import { BrandService } from 'src/app/_service/marca.service';
import { BrandComponent } from '../../configuration/brand/brand.component';
import { CategoryComponent } from '../../configuration/category/category.component';

@Component({
  selector: 'app-inventory-edicion',
  templateUrl: './edition.component.html',
  styleUrls: ['./edition.component.css'],
})
export class InventoryEdicionComponent implements OnInit {
  public chart: any;

  modificar!: boolean;
  product!: Product;

  categorys!: Category[]
  brands!: Brand[]
  data = new Product;

  filteredBrand = new Array;
  filteredCategory = new Array;

  loading: boolean = false;

  formGroup: FormGroup;

  barCodeSubscription: Subscription;
  barCodeObservable$: Observable<string>

  providers$!: Observable<Provider[]>

  srcPictureArray: string[] = ['product1.svg', 'product2.svg', 'product3.svg']
  srcPicture: string;



  forLoopBody = (iteration: number, delay: number): void => {
    setTimeout((): void => {
      this.srcPicture = this.srcPictureArray[iteration] // loop body here
    }, delay * iteration);
  };

  //@Input()  product = new Product; // decorate the property with @Input()
  constructor(
    //private dialogRef: MatDialogRef<InventoryEdicionComponent>,
    //@Inject(MAT_DIALOG_DATA) private data: Product,
    private productService: ProductService,
    private categoryService: CategoryService,
    private brandService: BrandService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private activateRoute: ActivatedRoute,
    private location: Location,
    private router: Router,
    private _loading: LoadingService,
    private formBuilder: FormBuilder,
    private bardCodeService: bardCodeService,
    private mensajeService: MensajeService,
    private compreAhora: compreAhoraService,
    private proovedorService: ProviderService,
    private etiquetaService: TagService
  ) {
    this.product = this.productService.productEdicion
  }

  ngOnInit(): void {

    this.providers$ = this.proovedorService.listar();

    this.barCodeObservable$ = this.bardCodeService.getMensajeCambio();

    this.barCodeSubscription = this.barCodeObservable$.subscribe(string => {
      if (this.formGroup.controls['bard_code'].value > 3) {
        this.productService.listarProductPorBar_code(string).subscribe(data => {
          if (data) {
            this.product = data;
            this.Form();
          }
          else {
            this.mensajeService.mensaje('No se encontro el product', 'info')
          }
        })
      }
      else {
        this.formGroup.controls.bard_code.setValue(string)

      }
    })


    this.listenToLoading();
    moment.locale('es-mx');
    /*
    No es lo mejor, pero se uso por el momento un servicio para compartir un product entre componentes.
    Tambien Se consulta si es undefined para ver si es una modificacion o si se registra un product nuevo.
    Hay una diferencia en el backend para consultar si al registrar, ya existe el product en la base de datos.
    */

    if (this.product == undefined) {

      this.product = { ...this.productService.productEdicion }
      this.modificar = true;

    } else {
      this.modificar = false;
    }
    this.Form()
    this.listarBrand();
    this.listarCategorys()


    for (let i = 0; i < 3; i++) {
      this.forLoopBody(i, 3500);
    }


  }

  ngOnDestroy() {
    this.barCodeSubscription.unsubscribe();
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


  /*
    busqueda(){
      this.compreAhora.listBardCode(this.formGroup.controls['bard_code'].value).subscribe(data=>{
      })
    }

  */

  Form() {
    this.formGroup = this.formBuilder.group({
      name: [this.product.name, Validators.required],
      brand: [this.product.brand],
      salePrice: [this.product.salePrice],
      purchasePrice: [this.product.purchasePrice,],
      bard_code: [this.product.bard_code],
      descripcion: [this.product.descripcion],
      clasification: [this.product.clasification],
      category: [this.product.category],
      netContent: [this.product.netContent],
      quickAccess: [this.product.quickAccess],
      id: [this.product.id],
      modify_uptime: [this.product.modify_uptime],
      price_uptime: [this.product.price_uptime],
      providers: [this.product.providers],
    })
  }

  compareObjects(o1: any, o2: any): boolean {
    return (
      o1.name === o2.name &&
      o1.idProvider === o2.idProvider
    );
  }

  compareObjectsBrand(o1: any, o2: any): boolean {
    return (
      o1.proovedor === o2.proovedor &&
      o1.id === o2.id
    );
  }

  brandDialog() {
    this.dialog.open(BrandComponent)
  }

  categoryDialog() {
    this.dialog.open(CategoryComponent)
  }

  compareObjectsCategory(o1: any, o2: any): boolean {
    return (
      o1.name === o2.name &&
      o1.id === o2.id
    );
  }


  priceFinal() {
    let purchasePrice: number = this.formGroup.controls['purchasePrice'].value
    let salePrice: number = this.formGroup.controls['salePrice'].value

    if (purchasePrice && salePrice) {
      let porcentaje = (purchasePrice * salePrice) / 100
      this.formGroup.controls.salePrice.setValue((Number(purchasePrice) + porcentaje).toFixed(2));
    }

  }

  operar() {
    let product: Product = this.formGroup.value as Product;
    if (this.formGroup.status == "VALID") {
      if (this.modificar) {
        this.productService.registrar(product).subscribe(() => {
          this.mensaje("Se agrego " + this.formGroup.controls['name'].value, "")
          this.router.navigateByUrl('pages/inventario/listar')
        }
        );


      } else if (!this.modificar) {

        this.productService.modificar(product).subscribe(() => {
          this.mensaje("Se modifico " + this.formGroup.controls['name'].value, "")
          this.router.navigateByUrl('pages/inventario/listar')

        }
        );

      }
    }
    else {
      this.mensaje('Complete todos los datos', '')
    }
  }

  listarCategorys() {
    this.categoryService.listar().subscribe(data => {
      this.categorys = data;
      this.filteredCategory = this.categorys.slice();

    })
  }

  listarBrand() {
    this.brandService.listar().subscribe(data => {
      this.brands = data;
      this.filteredBrand = this.brands.slice();

    })
  }

  ListarCambio() {
    this.productService.listar().subscribe(data => {
      this.productService.setProductCambio(data)
    })
  }

  mensaje(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }

  cerrar() { }


  listenToLoading(): void {
    this._loading.loadingSub
      .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
      .subscribe((loading) => {
        this.loading = loading;
      });
  }

  formatearFecha(string: string) {

    return moment(string).format('LL')

  }

  enviarATag() {
    let product: Product = this.formGroup.value as Product;
    this.etiquetaService.productATag(product).subscribe()
  }



}
