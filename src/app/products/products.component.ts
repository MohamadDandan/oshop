import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from 'shared/service/product.service';
import { CategoryService } from 'shared/service/category.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'shared/models/Product';
import { switchMap } from 'rxjs/operators';
import { ShoppingCartService } from 'shared/service/shopping-cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit ,OnDestroy {
  products: Product[] = [];
  categories$: any;
  category: any;
  cart:any;
  filteredProduct: Product[] = [];
  subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService,
    private shoppingCartService:ShoppingCartService
  ) {

    

    this.productService
      .getData()
      .pipe(
        switchMap((products: Product[]) => {
          this.products = products;
          return this.route.queryParamMap;
        })
      )
      .subscribe((params: { get: (arg0: string) => any; }) => {
        this.category = params.get('category');

        this.filteredProduct =
          this.category ? this.products.filter((p) => p.category === this.category) : this.products;
      });
  }
  
  async ngOnInit() {
    this.subscription = (await this.shoppingCartService.getCart())
      
        .subscribe((cart: any) => {
          this.cart = cart;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}//////compaare