import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Brand } from 'src/app/_model/brand';
import { BrandService } from 'src/app/_service/marca.service';
import { BrandEditionComponent } from './edition/brand-edition.component';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {

  dataSource = new MatTableDataSource<Brand>();

  displayedColumns: string[] = ['name', 'acciones'];
  displayedColumnsClubes: string[] = ['name', 'acciones'];

  constructor(private brandService: BrandService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) { }



  ngOnInit(): void {
    this.brandService.listar().subscribe(data=>{
      this.dataSource.data = data
    });

    this.brandService.getBrandCambio().subscribe(data=>{
      this.dataSource.data = data;
    })

    this.brandService.getMensajeCambio().subscribe(data=>{
      this.mensaje(data, '');
    })


  }

  openDialogEdicion(element?: Brand){
    this.dialog.open(BrandEditionComponent,{
      data: element
    })
  }

  mensaje(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
