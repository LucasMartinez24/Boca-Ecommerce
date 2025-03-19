import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { productoInterface } from 'src/app/model/producto';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { DataApiService } from 'src/app/services/data-api.service';

@Component({
  selector: 'app-producto-compra',
  templateUrl: './producto-compra.component.html',
  styleUrls: ['./producto-compra.component.css']
})
export class ProductoCompraComponent implements OnInit {
  producto:productoInterface={}
  accion: string = ""
  constructor(private auth:AuthService,private cart:CartService,private data:DataApiService,private router: Router, private activatedRoute: ActivatedRoute) {

  }
  ngOnInit(): void {
    this.getCurrentUser()
    this.activatedRoute.params.subscribe(params => {
      if (params['id'] == "0") {
        this.accion = "new";
      } else {
        this.accion = "update";
        this.getProducto(params['id']);
      }
    })
  }
  getProducto(id: string) {
    this.data.getProducto(id).subscribe(resp=>{
      this.producto=resp
    })
  }
  cantidad: number = 1;
  aux=this.producto.cantidad as any
  incrementarCantidad() {
    if(this.producto.cantidad!=null){
      if (this.cantidad < this.producto.cantidad) {
        this.cantidad++;
      }
    }
  }

  decrementarCantidad() {
    if (this.cantidad > 1) {
      this.cantidad--;
    }
  }
  addCart(){
    this.cart.addToCart(this.producto,this.cantidad)
    this.router.navigateByUrl('/carrito')
  }
  public isLogged: boolean = false;
  getCurrentUser() {
    this.auth.isAuth().subscribe((auth) => {
      if (auth) {
        this.isLogged = true;
      } else {
        this.isLogged = false;
      }
    });
  }
  intento:boolean=false
  boton(){
    this.intento=true
  }
}
