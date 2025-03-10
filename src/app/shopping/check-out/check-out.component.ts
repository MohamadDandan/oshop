import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from 'shared/service/shopping-cart.service';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.css'
})
export class CheckOutComponent implements OnInit {

  cart$:Observable<ShoppingCart>;
 
  constructor(private shoppingCartService:ShoppingCartService){}
  
  async ngOnInit() {
    this.cart$= await this.shoppingCartService.getCart();
  }
 
}
