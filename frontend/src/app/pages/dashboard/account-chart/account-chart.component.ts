import { Component, Input, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Sale } from 'src/app/_model/sale';

@Component({
  selector: 'app-account-chart',
  templateUrl: './account-chart.component.html',
  styleUrls: ['./account-chart.component.css']
})
export class AccountsChartComponent {

  public barChartLegend = false;
  public barChartPlugins = [];

  @Input() data: Sale[];
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      { data: [],
        backgroundColor: ["#36A1EA", "#FF6585", "#4BBFBF", "#FFA040", "#9967FF", "#FFCD56", "#C9CBCF"],
        hoverBackgroundColor: ["darkred", "darkgreen", "darkblue"],}

    ]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
  };



  ngOnInit(): void {
    const salesCount = this.salesByVendor(this.data);
    this.barChartData.labels = salesCount.labels
    this.barChartData.datasets[0].data = salesCount.data
    this.chart?.update();

  }

  salesByVendor(sales: Sale[]) {
    let salesCount: { [vendor: string]: { id: number, name: string, count: number } } = {};
    sales.forEach(sale => {
      if (!salesCount[sale.account?.id]) {
        salesCount[sale.account?.id] = { id: sale.account?.id, name: sale.account?.username, count: 0 };
      }
      salesCount[sale.account?.id].count++;
    });
    let chartData = {
      labels: [],
      data: []
    };
    for (let vendor in salesCount) {
      chartData.labels.push(salesCount[vendor].name);
      chartData.data.push(salesCount[vendor].count);
    }
    return chartData;
  }

}
