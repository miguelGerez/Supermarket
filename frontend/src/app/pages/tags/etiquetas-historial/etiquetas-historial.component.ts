import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Tag } from 'src/app/_model/tag';
import { Product } from 'src/app/_model/product';
import { TagService } from 'src/app/_service/tag.service';

@Component({
  selector: 'app-etiquetas-historial',
  templateUrl: './etiquetas-historial.component.html',
  styleUrls: ['./etiquetas-historial.component.css']
})
export class TagsHistorialComponent implements OnInit {
  etiquetas!: Tag[];

  constructor(private etiquetaService: TagService) { }


  ngOnInit(): void {
    this.etiquetaService.ListarImpresas().subscribe(data=>{
      this.etiquetas = data
    })
  }

}
