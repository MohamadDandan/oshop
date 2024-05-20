import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'shared/service/product.service';
import { CategoryService } from 'shared/service/category.service';
import { Component } from '@angular/core';
import { take } from 'rxjs';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {


  categories$: any;
  product=<any>{};
  id:any;

  constructor(
    private router:Router,
    private route: ActivatedRoute,
    private categoryService:CategoryService,
    private productService:ProductService,)  {
    this.categories$ = this.categoryService.getCategories();

     this.id=this.route.snapshot.paramMap.get('id');
    if(this.id) 
      this.productService.getProduct(this.id)
        .pipe(take(1))
          .subscribe(product => 
            this.product = product);
    
  }

  save(product:any) {
    if(this.id) this.productService.update(this.id,product);

    else this.productService.create(product);


      this.router.navigate(['/admin-products']);
  }

  delete() {
    if(!confirm('Are you sure you want to delete this product?')) return;
     
    this.productService.delete(this.id);
    this.router.navigate(['/admin-products']);
    
    }
    
}
