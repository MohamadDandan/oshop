import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Order } from 'shared/models/Order';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'shared/service/auth.service';
import { OrderService } from 'shared/service/order.service';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrl: './shipping-form.component.css'
})
export class ShippingFormComponent implements OnInit ,OnDestroy {
  @Input('cart')cart:ShoppingCart
  name: string="";
  address1: string=""
  address2: string=""
  city: string="";
  userSubscription:Subscription
  userId: string;

  shipping = {name: this.name,
    addressLine1: this.address1,
    addressLine2:this.address2, 
    city: this.city};


    constructor(
      private orderService:OrderService,
      private router:Router,
      private authService:AuthService,
    ){
      
    }
  ngOnInit(): void {
    this.userSubscription=this.authService.user$.subscribe(user => this.userId=user.uid)
  }
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
  async placeOrder() {
    let newOrder=new Order(this.userId,this.shipping,this.cart)
    let res=await this.orderService.placeOrder(newOrder);
    this.router.navigate(['orders-success/',res.key])
    
  }
}
