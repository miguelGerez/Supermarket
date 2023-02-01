import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Sale } from 'src/app/_model/sale';

@Component({
  selector: 'app-payment-method-chart',
  templateUrl: './payment-method-chart.component.html',
  styleUrls: ['./payment-method-chart.component.css']
})
export class PaymentMethodChartComponent implements OnInit {

  @Input() data : Sale[];
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  public pieChartLabels = [];
  public pieChartDatasets = [ {
    data: [],
    backgroundColor: ["#36A1EA", "#FF6585", "#4BBFBF", "#FFA040", "#9967FF", "#FFCD56", "#C9CBCF"],
    hoverBackgroundColor: ["darkred", "darkgreen", "darkblue"],
  } ];
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor() { }

  label: string[] = []
  result: any [] = []


  ngOnInit(): void {
    this.test()
  }

  ngOnChanges() {this.test()}


  resultado(saleDetails: any) {

    let total = 0
    for (let d of saleDetails) {
      for (let a of d.saleDetail) {
        total += a.price * a.quantity
      }
    }
    return total
  }

  test(){
    let result = this.data.reduce(function (r, a) {
      r[a.paymentMethod.name] = r[a.paymentMethod.name] || [];
      r[a.paymentMethod.name].push(a);
      return r;
    }, Object.create(null));

    this.result = result;
    this.label = Object.keys(result)
    this.pieChartLabels = this.label

    this.pieChartDatasets[0].data = []
    this.label.forEach(element=>{
      let number = this.resultado(result[element])
      this.pieChartDatasets[0].data.push(number)
    })
    this.chart?.update();
  }

}
