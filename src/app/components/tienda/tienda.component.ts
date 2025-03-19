import { Component, OnInit } from '@angular/core';
import { productoInterface } from 'src/app/model/producto';
import { DataApiService } from 'src/app/services/data-api.service';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent implements OnInit{
  productos:productoInterface[]=[]
  constructor(private data:DataApiService){

  }
  ngOnInit(): void {
    this.data.getTodosLosProductos().subscribe(resp=>{
      this.productos=resp
    })
  }
}
