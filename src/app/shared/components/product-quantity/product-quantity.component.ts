import { Component, Input } from '@angular/core';
import { AuthService } from 'shared/service/auth.service';
import { Product } from 'shared/models/Product';
import { ShoppingCartService } from 'shared/service/shopping-cart.service';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrl: './product-quantity.component.css'
})
export class ProductQuantityComponent {

  @Input('product') product: Product;
  @Input('shoppingCart') shoppingCart: any;

  constructor(private cartService:ShoppingCartService) { }


  addToCart() {
    this.cartService.addToCart(this.product);
  }
  removeFromCart() {
    this.cartService.removeFromCart(this.product);
    }
    
  
}
