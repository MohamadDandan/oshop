import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, map } from 'rxjs';
import { Product } from 'shared/models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
 

  constructor(private db:AngularFireDatabase) { }

  create(product: any) {
    return this.db.list('/products').push(product);
  }
  get(){
    return this.db.list('/products').valueChanges();
  }
  getAll():Observable<any[]>{
    return this.db.list('/products').snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const key = a.payload.key;
        const data = a.payload.val();
        return {data, key};
      })
    }));
  }
  getData():Observable<any[]>{
    return this.db.list('/products').valueChanges()
  }
 
  getProduct(productId:any){
    return this.db.object('/products/' + productId).valueChanges();
  }
  update(productId:any,product:any){
    return this.db.object('/products/' + productId).update(product);
  }
  delete(productId:any){
    return this.db.object('/products/' + productId).remove();
  }
}
