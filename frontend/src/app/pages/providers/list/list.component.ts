import { EditionComponent } from './../edition/edition.component';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Provider } from 'src/app/_model/provider';
import { ProviderService } from 'src/app/_service/provider.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  displayedColumns: string[] = ['name', 'phone', 'mail', 'actions'];
  dataSource: Provider[];

  constructor(private providerService: ProviderService,
    public dialog: MatDialog){

  }

  ngOnInit(){
    this.list()
  }

  edit(provider?: Provider){
    this.dialog.open(EditionComponent,{
      data: provider
    })
  }

  list(){
    this.providerService.listar().subscribe(data=>{
      this.dataSource = data
    })

    this.providerService.ProviderCambio.subscribe(data=>{
      this.dataSource = data
    })
  }

}
