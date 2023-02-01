import { Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { Sale } from 'src/app/_model/sale';

@Component({
  selector: 'app-monthly-chart',
  templateUrl: './monthly-chart.component.html',
  styleUrls: ['./monthly-chart.component.css']
})
export class MonthlyChartComponent implements OnInit {
  @Input() data : Sale[];

  constructor() { }

  lineChart: ChartConfiguration<'line'>['data'] = {
    datasets: [
      {
        data: [],
        borderColor: "#3e95cd",
        fill: false,
      },
    ],
  };


  public lineChartOptions: ChartOptions<'line'> = {
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

  public lineChartLegend = false;

  ngOnInit(): void {
  }

}
