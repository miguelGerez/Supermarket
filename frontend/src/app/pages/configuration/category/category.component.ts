import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Observable } from 'rxjs';
import { Category } from 'src/app/_model/category';
import { CategoryService } from 'src/app/_service/category.service';
import { CategoryEdicionComponent } from './edition/category-edition.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  dataSource = new MatTableDataSource<Category>();

  displayedColumns: string[] = ['name', 'acciones'];
    // Pie
    public pieChartOptions: ChartOptions<'pie'> = {
      responsive: false,
    };
    public pieChartLabels = [ 'asd'];
    public pieChartDatasets = [ {
      data: []
    } ];
    public pieChartLegend = true;
    public pieChartPlugins = [];

  constructor(private categoryService: CategoryService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) { }



  ngOnInit(): void {
    this.categoryService.listar().subscribe(data => {
      this.dataSource.data = data
    });

    this.categoryService.getCategoryCambio().subscribe(data => {
      this.dataSource.data = data;
    })

    this.categoryService.getMensajeCambio().subscribe(data => {
      this.mensaje(data, '');
    })

    this.categoryService.listarCantidadDeProductsPorId().subscribe(data => {

      this.pieChartDatasets[0].data = data.map(x => x.quantity);
      this.pieChartLabels = data.map(x => x.name);

    })

  }

  openDialogEdicion(element?: Category) {
    this.dialog.open(CategoryEdicionComponent, {
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
