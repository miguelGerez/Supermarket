import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { saleAnualDTO } from 'src/app/_dto/ventaAnualDTO';
import { Sale } from 'src/app/_model/sale';
import { SaleService } from 'src/app/_service/sale.service';

@Component({
  selector: 'annual-chart',
  templateUrl: './annual-chart.component.html',
  styleUrls: ['./annual-chart.component.css']
})
export class AnnualChartComponent implements OnInit {

  constructor(private saleService: SaleService) { }
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;


  lineChart: ChartConfiguration<'line'>['data'] = {
    datasets: [
      {
        data: [],
        borderColor: "#3e95cd",
        fill: true,
      },
    ]
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
        text: 'Anual',
      },
    },
  };

  public lineChartLegend = false;


  ngOnInit(): void {
    this.saleService.listarAnual().subscribe(data=>{
      this.ChartAnual(data)

    })
  }

  ChartAnual(data: saleAnualDTO[]){
    this.lineChart.labels = data.map(x=> x.month)
    this.lineChart.datasets[0].data = data.map(x => x.quantity)
    this.chart?.update();
  }

}
