import { Component, Input, OnInit } from '@angular/core';
import { ShoppingCartService } from 'shared/service/shopping-cart.service';
import { Observable } from 'rxjs';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { Product } from 'shared/models/Product';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent implements OnInit {
  @Input('shoppingCart') shoppingCart: ShoppingCart;
  cart$: Observable<ShoppingCart>;
  product: Product;

  constructor(private shoppingCartService: ShoppingCartService){}

  async ngOnInit() {
   this.cart$=await this.shoppingCartService.getCart();
  }
  /* addToCart() {
    this.shoppingCartService.addToCart(this.product);
  }
  removeFromCart() {
    this.shoppingCartService.removeFromCart(this.product);
    } */
    clearCart() { 
      this.shoppingCartService.clearCart();
    }
}
