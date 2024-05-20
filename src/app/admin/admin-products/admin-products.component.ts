import { Observable, Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ProductService } from 'shared/service/product.service';
import { Product } from 'shared/models/Product';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrl: './admin-products.component.css'
})
export class AdminProductsComponent implements OnDestroy,OnInit {

  products: Product[]|any;
  searchProducts: any[];
  subscription: Subscription
  data: Observable<any[]>;
  
  constructor(private productService:ProductService,private db: AngularFireDatabase){
   this.subscription= this.productService.getAll()
    .subscribe(products =>{
     
      this.searchProducts= this.products = products;
    })
  }
  ngOnInit(): void {
    this.data = this.db.list('/products').valueChanges();
    this.data.subscribe(products => {
      this.dataSource = new MatTableDataSource(products);
      this.dataSource.sort = this.sort;
    });
  }

  displayedColumns: string[] = ['title', 'price','edit'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatSort) sort: MatSort;
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  search(query: string) {
    this.searchProducts = (query) ? 
    this.products.filter((p: { data: {title:string}, key: string }) => p.data.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())) : 
    this.products;


    
    }

}
