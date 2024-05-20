import { Product } from 'shared/models/Product';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';
import { Observable, map, take } from 'rxjs';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { ShoppingCartItem } from 'shared/models/shopping-cart-item';

@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId).valueChanges().pipe(
      map((x:any) => new ShoppingCart(x?.items)));
  }

  async addToCart(product: Product) { 
    this.updateItem(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }

  async clearCart() { 
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }
  

  private create() { 
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId(): Promise<any> { 
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId; 

    let result = await this.create();
    if (result.key) 
      localStorage.setItem('cartId', result.key);
      return result.key;
  }

  private async updateItem(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.title);
    item$.valueChanges().pipe(take(1)).subscribe((item:any) => {
      let quantity = (item?.quantity || 0) + change;
      if (quantity === 0) item$.remove();
      else item$.update({ 
        title: product.title,
        imageUrl: product.imageUrl,
        price: product.price,
        quantity: quantity
      });
    });
  }
}

/* @Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  

  constructor(private db:AngularFireDatabase) { 
    
  }

   private create() {
    return this.db.list('/shopping-cart').push({
        dateCreated:new Date().getTime(),
    });
  }

  async getCart() : Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCart();
    return this.db.object('/shopping-cart/' + cartId).valueChanges().pipe(
      map((x: any) => new ShoppingCart(x.items))
    )

    /* .snapshotChanges().pipe(
      map((x: any) => new ShoppingCart())
    ) 
    
}

  private async getOrCreateCart(){
    let cartId = localStorage.getItem('cartId');
    if(cartId) return cartId

    let result = await this.create();
    if (result.key) 
      localStorage.setItem('cartId', result.key);
      return result.key;
  
    
  }

  private getItem(cartId:string,productId:string){
    return this.db.object('/shopping-cart/'+cartId+'/items/'+productId);
  }
  async addToCart(product:Product){
    this.updateItem(product,1)
  }

  async removeFromCart(product: Product) {
   this.updateItem(product,-1)
  }
  private async updateItem(product: Product, change: number){
    let cartId=await this.getOrCreateCart();
    let item$=this.getItem(cartId!,product?.title);
    
      item$.valueChanges().pipe(take(1))
      .subscribe((item:any) => {
        let quantity = (item.quantity || 0) + change;
        if (quantity === 0) item$.remove();
        else item$.update({ 
          title: product.title,
          imageUrl: product.imageUrl,
          price: product.price,
          quantity: quantity
        });
      });
  }
} */