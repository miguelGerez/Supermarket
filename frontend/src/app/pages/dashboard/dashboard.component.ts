import { FormControl } from '@angular/forms';
import { LayoutService } from './../../_service/layout.service';
import { Component, PipeTransform, ViewChild } from '@angular/core';
import { Sale } from 'src/app/_model/sale';
import { SaleService } from 'src/app/_service/sale.service';
import * as moment from 'moment';
import { MensajeService } from 'src/app/_service/mensajes.service';
import { ChartConfiguration, ChartOptions, Chart, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { SaleDetail } from 'src/app/_model/saleDetail';
import { Observable } from 'rxjs';
import { LocalService } from 'src/app/_service/local.service';
import { Local } from 'src/app/_model/local';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements PipeTransform {

  initialDate = new Date

  displayedColumns: string[] = ['quantity', 'total', 'date', 'paymentMethod', 'account', 'acciones'];
  dataSource!: Sale[];

  quantityDeSales!: number;
  status: boolean = false;
  total = 0;
  local$!: Observable<Local[]>;
  local = new FormControl();

  label: string[] = []
  data: number[] = []



  transform(value: Date | moment.Moment, dateFormat: string): any {

  }

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  lineChartMensual: ChartConfiguration<'line'>['data'] = {

    datasets: [
      {
        data: [],
        borderColor: "#3e95cd",
        fill: false,
      },

    ],
  };


  public lineChartOptionsMensual: ChartOptions<'line'> = {
    responsive: false,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Mensual',
      },
    },

  };

  constructor(private saleService: SaleService,
    private mensajeService: MensajeService,
    private LayoutService: LayoutService,
    private localService: LocalService
  ) {
  }

  ngOnChanges(){
    this.LayoutService.setTitle('Dashboard') ;

  }

  ngOnInit(): void {
    this.listar();

    this.salePorFecha(new Date);
    moment.locale('es-mx');
  }


  listar() {
    this.local$ = this.localService.listar();
  }




  getTotal() {
    this.total = 0
    for (let sale of this.dataSource) {
      for (let detail of sale.saleDetail) {
        this.total += detail.price * detail.quantity
      }
    }
  }

  momentFromNow(value: Date) {
    return moment(value).fromNow();
  }


  moment(value: Date) {
    return moment(value).format('L');
  }



  salePorFecha(date: Date) {
    this.saleService.listByDate(moment(date).format('YYYY-MM-DD')).subscribe(data => {
      if (data.length === 0) {
        this.mensajeService.mensaje("No existen ventas en la fecha seleccionada")
        this.dataSource = null
      }
      else {
        this.dataSource = data
        this.getTotal()
      }
    })
  }

  salesPorCategory(data: SaleDetail) {

  }





}
