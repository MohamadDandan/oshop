import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'shared/service/auth.service';
import { AppUser } from 'shared/models/app-user';
import { Router } from '@angular/router';
import { ShoppingCartService } from 'shared/service/shopping-cart.service';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrl: './bs-navbar.component.css',
})
export class BsNavbarComponent implements OnInit {

  appUser: AppUser |null;
  cart$: Observable<ShoppingCart>;
  constructor(
    private auth: AuthService,
    private router: Router,
    private shoppingCart: ShoppingCartService) {}

   async ngOnInit() {
      this.auth.appUser$.subscribe(appUser =>this.appUser = appUser)
       this.cart$=await this.shoppingCart.getCart();
      
  };
  

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('');
  }
}