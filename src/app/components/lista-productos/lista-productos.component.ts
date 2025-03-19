import { Component, OnInit } from '@angular/core';
import { productoInterface } from 'src/app/model/producto';
import { DataApiService } from 'src/app/services/data-api.service';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent implements OnInit{
  productos:productoInterface[]=[]
  img:boolean=false
  prod:productoInterface={}
  modal:boolean=false
  constructor(private data:DataApiService){

  }
  ngOnInit(): void {
    this.data.getTodosLosProductos().subscribe(resp=>{
      this.productos=resp
    })

  }
  OpenModal(item:productoInterface){
    this.modal=true
    this.prod=item
  }
  CloseModal(){
    this.modal=false
  }
  borrarProducto(){
    this.data.borrarProducto(this.prod).then(resp=>{
      console.log("borrado con exito");
      this.CloseModal()
    })
  }
}
