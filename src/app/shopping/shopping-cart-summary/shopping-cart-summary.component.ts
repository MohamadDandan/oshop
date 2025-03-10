import { Component, Input } from '@angular/core';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'app-shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrl: './shopping-cart-summary.component.css'
})
export class ShoppingCartSummaryComponent {
  @Input('cart') cart:ShoppingCart;

}
