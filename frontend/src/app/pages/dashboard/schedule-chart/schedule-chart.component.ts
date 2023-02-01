import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import * as moment from 'moment';
import { BaseChartDirective } from 'ng2-charts';
import { SaleDetail } from 'src/app/_model/saleDetail';
import { Sale } from 'src/app/_model/sale';

@Component({
  selector: 'app-schedule-chart',
  templateUrl: './schedule-chart.component.html',
  styleUrls: ['./schedule-chart.component.css']
})
export class ScheduleChartComponent implements OnInit {

  @Input() data : Sale[];

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        fill: true,
        label: 'total',
        tension: 0.1,
        backgroundColor: '#FFCD56'
      }
    ],

  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
  };
  public lineChartLegend = false;

  constructor() { }

  ngOnInit(): void {
    moment.locale('es-mx');
    if(this.data){
      this.calculateSalesByHour(this.data)
    }
  }

  ngOnChanges() {
    if(this.data){
      this.calculateSalesByHour(this.data)
    }
  }

  price(saleDetail: SaleDetail[]){
    let total: number;
    saleDetail.forEach(element => {
      total = element.price
    });
    return total
  }
/*
  test(){
    this.lineChartData.datasets[0].data = []
    this.data.forEach(element => {
      let total = 0;
      element.saleDetail.forEach(element => {
        total += element.price * element.quantity
      });
      this.lineChartData.datasets[0].data.push(total)
    })
    this.lineChartData.labels = this.data.map(x=> moment(x.date).format('LT'))
    this.chart?.update();

  }
*/
  public calculateSalesByHour(sales: Sale[]): void {
    // Create an array to store the sales count by hour
    const salesByHour = new Array(24).fill(0);
    // Iterate through the sales and increment the corresponding hour
    sales.forEach(sale => {
        const hour = new Date(sale.date).getHours();
        salesByHour[hour]++;
    });
    // Update the chart data and labels
    this.lineChartData.labels = Array.from({ length: 24 }, (_, i) => `${i}:00`);
    this.lineChartData.datasets[0].data = salesByHour;
    this.chart?.update();


}


}
