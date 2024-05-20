import { AuthService } from 'shared/service/auth.service';
import { Component, Input } from '@angular/core';
import { Product } from 'shared/models/Product';
import { ShoppingCartService } from 'shared/service/shopping-cart.service';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {


  @Input('product') product: Product;
  @Input('show-actions') showActions = true;
  @Input('shoppingCart') shoppingCart: ShoppingCart;

  constructor(private cartService:ShoppingCartService,private auth:AuthService) { }


  addToCart() {
    this.cartService.addToCart(this.product);
  }
 

  
}