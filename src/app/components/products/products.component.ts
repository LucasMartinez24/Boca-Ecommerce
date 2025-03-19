import { Component, OnInit } from '@angular/core';
import { productoInterface } from 'src/app/model/producto';
import { AuthService } from 'src/app/services/auth.service';
import { DataApiService } from 'src/app/services/data-api.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  productos:any[]=[]
  constructor(private dataApi:DataApiService){

  }
  ngOnInit(): void {
    this.dataApi.getTodosLosProductos().subscribe(resp=>{
      this.productos=[]
      for(let i=0;i<resp.length;i++){
        if(resp[i].oferta==true){
          this.productos.push(resp[i])
        }
      }
    })

  }
}
