import { Category } from './../../../_model/category';
import { BrandService } from './../../../_service/marca.service';
import { Component, Input, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Brand } from 'src/app/_model/brand';
import { Sale } from 'src/app/_model/sale';
import { CategoryService } from 'src/app/_service/category.service';

@Component({
  selector: 'app-brand-chart',
  templateUrl: './brand-chart.component.html',
  styleUrls: ['./brand-chart.component.css']
})
export class BrandChartComponent {
  @Input() data: Sale[];
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  category!: Category[]

  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Cigarros',
        backgroundColor: ["#36A1EA", "#FF6585", "#4BBFBF", "#FFA040", "#9967FF", "#FFCD56", "#C9CBCF"],
        hoverBackgroundColor: ["darkred", "darkgreen", "darkblue"],
      }
    ]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,

  };

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    if (this.data) {
      this.getBrandSales(this.data, 'Cigarros')
    }
  }

  ngOnChanges() {
    if (this.data) {
      this.getBrandSales(this.data, 'Cigarros')
      this.category = this.getCategoriesFromSales(this.data)

    }

  }


  resultado(saleDetails: any) {
    let total = 0
    for (let d of saleDetails) {
      for (let a of d.saleDetail) {
        total += a.price * a.quantity
      }
    }
    return total
  }

  getCategoriesFromSales(sales: Sale[]): Category[] {
    let categories: Category[] = [];
    sales.forEach(sale => {
        sale.saleDetail.forEach(saleDetail => {
            if (saleDetail.product && saleDetail.product.category
                && saleDetail.product.category.name.trim() !== "") {
                let existingCategory = categories.find(category => category.id === saleDetail.product.category.id);
                if (existingCategory) {
                    existingCategory.quantity += saleDetail.quantity;
                } else {
                    let newCategory = {
                        id: saleDetail.product.category.id,
                        name: saleDetail.product.category.name,
                        quantity: saleDetail.quantity
                    };
                    categories.push(newCategory);
                }
            }
        });
    });
    categories.sort((a, b) => a.name.localeCompare(b.name));
    console.log(categories)
    return categories;
}

  getBrandSales(sales: Sale[], category: string): { [brand: string]: number } {
    const brandSales: { [brand: string]: number } = {};
    for (const sale of sales) {
      for (const saleDetail of sale.saleDetail) {
        if (saleDetail.product?.category?.name === category) {
          if (brandSales[saleDetail.product.brand?.name]) {
            brandSales[saleDetail.product.brand?.name] += saleDetail.quantity;
          } else {
            brandSales[saleDetail.product.brand?.name] = saleDetail.quantity;
          }
        }
      }
    }
    this.barChartData.labels = Object.keys(brandSales)
    this.barChartData.datasets[0].data = Object.values(brandSales)
    this.barChartData.datasets[0].label = category

    this.chart?.update()
    return brandSales;
  }

  compareObjects(o1: any, o2: any): boolean {
    return (
      o1.id === o2.id &&
      o1.id === o2.id
    );
  }




  CategoryChanges(category: Category) {
    this.getBrandSales(this.data, category.name)
  }



}


