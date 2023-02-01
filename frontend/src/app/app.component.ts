import { LayoutService } from './_service/layout.service';
import { Component } from '@angular/core';
import AOS from "aos";
import { LoadingService } from './_service/loading.service';
import * as onscanjs from 'onscan.js'
import { bardCodeService } from './_service/bardCode.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'supermercado';

  constructor(private _loading: LoadingService,
    private bardCodeService: bardCodeService,
    private LayoutService: LayoutService
  ) { }

  ngOnInit(): void {
    AOS.init();

    this.LayoutService.getTitle().subscribe(data=>{
      if(data){this.title = data}
    }
      )

    onscanjs.attachTo(document, {
      suffixKeyCodes: [13], // enter-key expected at the end of a scan
      reactToPaste: true, // Compatibility to built-in scanners in paste-mode (as opposed to keyboard-mode)
      onScan: (sCode) => { // Alternative to document.addEventListener('scan')
      return this.bardCodeService.setBardCode(sCode)
      },
    });
  }



}
