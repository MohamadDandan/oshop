import { Component } from '@angular/core';
import { AuthService } from 'shared/service/auth.service';
import { OrderService } from 'shared/service/order.service';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css'
})
export class MyOrdersComponent {
  orders$: Observable<any>;
  
  constructor(
    private authService: AuthService,
    private orderService: OrderService) { 

      this.orders$=this.authService.user$.pipe(
      switchMap(user => this.orderService.getOrdersByUser(user.uid))
      )
      console.log(this.orders$)
   // this.orders$ = authService.user$.pipe(map(u => orderService.getOrdersByUser(u.uid)));
  }
}
