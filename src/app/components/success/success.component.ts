import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit{
  transactionStatus: string='';
  aprobado:boolean=true
  contador:number=3
  constructor(private route: ActivatedRoute,private router: Router,private cart:CartService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.transactionStatus = params['collection_status'];
      if (this.transactionStatus === 'approved') {
        this.aprobado=true
        this.cart.clearCart()
      }else{
        this.aprobado=false
      }
    });
    setInterval(() => {
      this.contador--;
      if (this.contador === 0) {
        this.router.navigate(['/inicio']);
      }
    }, 1000);
  }
}
