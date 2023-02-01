import { Injectable } from "@angular/core";
import { PrintService, UsbDriver } from "ng-thermal-print";
import { Sale } from "../_model/sale";
import { SaleDetail } from "../_model/saleDetail";
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ThermalPrintService {
  usbPrintDriver = new UsbDriver();
  printService: PrintService;

  constructor(printService: PrintService) {
    this.printService = printService;
    this.setPrintDriver();
  }

  setPrintDriver() {
    const vendorId = JSON.parse(localStorage.getItem('vendorId'));
    const productId = JSON.parse(localStorage.getItem('productId'));
    if (vendorId && productId) {
      this.usbPrintDriver = new UsbDriver(vendorId, productId);
      this.printService.setDriver(this.usbPrintDriver, 'ESC/POS');
    }
  }

  requestUsb() {
    this.usbPrintDriver.requestUsb().subscribe(result => {
      this.usbPrintDriver = new UsbDriver(result.vendorId, result.productId);
      this.printService.setDriver(this.usbPrintDriver, 'ESC/POS');
      localStorage.setItem('vendorId', JSON.stringify(result.vendorId));
      localStorage.setItem('productId', JSON.stringify(result.productId));
    });
  }

  async print(sale: Sale) {
    await this.waitForConnection();
    this.printService.init()
    .writeLine('Supermercado la vieja esquina')
    .feed(1)
    .setBold(true)
    .writeLine('Productos vendidos:')
    .setBold(false);

    let total = 0;
    for (const detail of sale.saleDetail) {
      const name = `Nombre: ${detail.product.name}`;
      const price = `Precio: $${detail.product.salePrice}`;
      const quantity = `Cantidad: ${detail.quantity}`;
      this.printService
        .writeLine(name)
        .writeLine(price)
        .writeLine(quantity)
        .feed(1);
      total += detail.product.salePrice * detail.quantity;
    }

    this.printService
      .writeLine(`Fecha y hora de la venta:`)
      .writeLine(`${moment(sale.date).format('LLL')}`)
      .feed(1)

      .writeLine(`Total:` + `$${total}`)
      .feed(1)

      .writeLine('Gracias por su compra')
      .feed(4)
      .cut('full')
      .flush();
  }

  async waitForConnection() {
    return new Promise<void>(resolve => {
      this.printService.isConnected.subscribe(result => {
        if (result) {
          resolve();
        }
      });
    });
  }
}
