import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ShoppingCartService } from './shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private db:AngularFireDatabase,
    private shoppingCartService:ShoppingCartService) { }

 async placeOrder(order:any){
    let res=await this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return res
  }

  getOrders() { 
    return this.db.list('/orders');
  }

  getOrdersByUser(userId: string) {
    return this.db.list('/orders', ref => ref.orderByChild('userId').equalTo(userId)).valueChanges()
  }
}
