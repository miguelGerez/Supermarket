import { EditionComponent } from './../../providers/edition/edition.component';
import { AfterViewInit, Component, HostListener, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { UntypedFormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Category } from 'src/app/_model/category';
import { Brand } from 'src/app/_model/brand';
import { Product } from 'src/app/_model/product';
import { Provider } from 'src/app/_model/provider';
import { bardCodeService } from 'src/app/_service/bardCode.service';
import { CategoryService } from 'src/app/_service/category.service';
import { compreAhoraService } from 'src/app/_service/compreAhora.service';
import { TagService } from 'src/app/_service/tag.service';
import { MensajeService } from 'src/app/_service/mensajes.service';
import { ProductService } from 'src/app/_service/product.service';
import { ProviderService } from 'src/app/_service/provider.service';
import { BrandService } from 'src/app/_service/marca.service';
import { InventoryEdicionComponent } from '../edition/edition.component';

@Component({
  selector: 'app-inventory-listar',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class InventoryListarComponent implements OnInit {

  displayedColumns: string[] = ['product.name', 'brand', 'netContent', 'category', 'price_de_compra', 'price_de_sale', 'acciones'];
  displayedColumnsEspecialidad: string[] = ['especialidad', 'acciones'];

  dataSource = new MatTableDataSource<Product>();

  category!: Category[]
  brands!: Brand[]

  categorySeleccionada!: Category;
  brandSeleccionada!: Brand;

  filteredStates: Observable<Product[]>;
  dateConsulta: Date;

  globalFilter = '';

  filteredBrand = new Array;
  filteredCategory = new Array;

  autoCompleteList!: Observable<Product[]>;
  stateCtrl = new UntypedFormControl('');

  filteredValues = {
    position: '', brand: '', weight: '',
    symbol: ''
  };

  formGroup: FormGroup;

  stringAutoComplete!: string
  barCodeSubscription: Subscription;
  barCodeObservable$: Observable<string>

  providers!: Provider[]
  ProviderSeleccionado!: Provider

  busqueda: boolean = false;

  constructor(
    private productService: ProductService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private categoryService: CategoryService,
    private brandService: BrandService,
    private mensajeService: MensajeService,
    private router: Router,
    private bardCodeService: bardCodeService,
    private proovedorService: ProviderService,
    private compreMasService: compreAhoraService,
    private etiquetaService: TagService,

  ) {
    this.filteredStates = this.stateCtrl.valueChanges.pipe(
      startWith(''),
      map(state => (state ? this._filterStates(state) : this.dataSource.data.slice())),
    );
  }

  @ViewChild(MatSort) sort: MatSort;



  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {

    this.stateCtrl.valueChanges.subscribe(data => {
      this.autoComplete(data)
    })

    this.proovedorService.listar().subscribe(data => { this.providers = data })
    this.barCodeObservable$ = this.bardCodeService.getMensajeCambio()
    this.barCodeSubscription = this.barCodeObservable$.subscribe(string => { this.onDetected(string) })

    moment.locale('es-mx');
    this.categoryService.listar().subscribe(data => {
      this.category = data
      this.filteredCategory = this.category.slice();

    });
    this.brandService.listar().subscribe(data => {
      this.brands = data
      this.filteredBrand = this.brands.slice();
    })
    this.filteredStates = this.productService.list()
  }




  ngOnDestroy() {
    this.barCodeSubscription.unsubscribe();
  }

  enviarATag(product: Product) {
    this.etiquetaService.productATag(product).subscribe()
  }

  //filtros

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  filtroBrand() {
    this.dataSource.filter = this.brandSeleccionada.name;

  }

  cleanTable() {
    this.dataSource.data = null;
    this.stateCtrl.reset()
  }

  onDetected(string: string) {
    this.productService.listarProductPorBar_code(string).subscribe(data => {
      return data ? this.openDialogEdicionProduct(data) : this.mensajeService.mensaje(string, 'info')
    })
  }

  private _filterStates(value: string): Product[] {
    const filterValue = value.toLowerCase();

    return this.dataSource.data.filter(state => state.name.toLowerCase().includes(filterValue));
  }

  eliminarProduct(id: number, name: string) {
    this.productService.eliminar(id).subscribe(() =>
      this.productService.list().subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
        this.productService.setMensajeCambio(
          'Se elimino correctamente ' + name
        );
      })
    );
  }

  filtroPorBrand() {
    this.dataSource.filter += this.brandSeleccionada.name
  }

  crearTablaProduct(data: Product[]) {
    this.dataSource = new MatTableDataSource(data);
  }


  //Listar
  listarProductPorSinPrecio() {
    this.productService.listarProductPorSinPrecio().subscribe(data => {
      this.crearTablaProduct(data)
    })
  }

  listarProducts() {
    this.productService.list().subscribe((data) => {
      this.crearTablaProduct(data);
      this.dateConsulta = new Date();
    });
  }

  listarPorBrand() {
    this.productService.ListarPorBrand(this.brandSeleccionada.id).subscribe(data => {
      this.crearTablaProduct(data);
    })

  }

  listarPorCategory() {
    this.productService.ListarPorCategory(this.categorySeleccionada.id).subscribe(data => {
      this.crearTablaProduct(data);
    })
  }

  listarPorCategoryYBrand() {
    this.productService.listarPorCategoryYBrand(this.brandSeleccionada.id, this.categorySeleccionada.id).subscribe(data => {
      this.crearTablaProduct(data);
    })
  }

  listarPorProvideres() {
    this.productService.listarProductPorProvider(this.ProviderSeleccionado.id).subscribe(data => {
      this.crearTablaProduct(data);
    })
  }

  listar() {

    if (this.brandSeleccionada && !this.categorySeleccionada) {
      this.listarPorBrand()
    }
    else if (this.categorySeleccionada && !this.brandSeleccionada) {
      this.listarPorCategory()
    }

    else if (this.brandSeleccionada && this.categorySeleccionada) {
      this.listarPorCategoryYBrand();
    }

    else if (this.ProviderSeleccionado) {
      this.listarPorProvideres()
    }
    else {
      this.dataSource = new MatTableDataSource<Product>();
    }
  }

  openDialogEdicionProduct(product?: Product) {
    //this.productService.productEdicion = product
    //this.router.navigateByUrl('pages/inventario/producto')
    this.dialog.open(InventoryEdicionComponent, {
      data: product
    })
  }

  exportarExcel() {
    this.productService.exportarExcel().subscribe((data) => {
      //let file = new Blob([data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'})

      let file = new File([data], 'report.xlsx',
        { type: 'application/vnd.ms-excel' });

      var blob = new Blob(
        [data],
        { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64," }
      );

      // Programatically create a link and click it:
      var a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = 'pacientes';
      a.click();
    })
  }


  momentFromNow(value: Date) {
    return moment(value).fromNow();
  }


  test() {
    this.compreMasService.listBardCode('7790070509109').subscribe(data => {
      return data ? data.response.products.forEach(element => {
      }) : 'No existe el product'
    }
    )
  }

  autoComplete(string: string) {
    if (string?.length > 4) {
      this.productService.autoComplete(string).subscribe(data => {
        this.crearTablaProduct(data)
      });
    }
  }


  sortData(sort: Sort) {
    const data = this.dataSource.data.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource.data = data;
      return;
    }

    this.dataSource.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return compare(a.name, b.name, isAsc);
        default:
          return 0;
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}





