import { ProviderService } from 'src/app/_service/provider.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.css']
})
export class ProvidersComponent {

  constructor(private providerService: ProviderService){

  }

}
