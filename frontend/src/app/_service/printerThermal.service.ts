import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { PrintService, UsbDriver, WebPrintDriver } from 'ng-thermal-print';
import { Sale } from '../_model/sale';

@Injectable({
  providedIn: 'root'
})
export class printerThermalService {

  statuss = new Subject<boolean>();

  status: boolean = false;
  usbPrintDriver!: UsbDriver;

  constructor(private printService: PrintService) {
    if(this.usbPrintDriver){

    }

    this.printService.isConnected.subscribe(result => {
      this.status = result;
      if (result) {
          console.log('Connected to printer!!!');
      } else {
      console.log('Not connected to printer.');
      }
    })

  }





  printSale(sale: Sale){
    //this.print('Alfajor')

    /*
    sale.saleDetail.forEach(element => {
      this.print(element.product.name)
    });*/
  }


  requestUsb() {
    this.usbPrintDriver.requestUsb().subscribe(result => {
      console.log('resultado : ', result)
      this.printService.setDriver(this.usbPrintDriver, 'ESC/POS');
      console.log('this.usbPrintDriver' ,this.usbPrintDriver)
    });
  }


  print(string: string) {
    this.printService.init()
      .setBold(true)
      .writeLine(string)
      .writeLine(string)
      .setBold(false)
      .feed(4)
      .cut('full')
      .flush();
  }

  setStatus(boolean: boolean){
    this.statuss.next(boolean);
  }

  getStatus(){
    return this.statuss.asObservable();
  }

}
