import { NgModule } from "@angular/core";
import { AngularFireModule } from "@angular/fire/compat";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { SharedModule } from "shared/shared.module";
import { AdminModule } from "./admin/admin.module";
import { AppComponent } from "./app.component";
import { CoreModule } from "./core/core.module";
import { LoginComponent } from "./core/login/login.component";
import { environment } from "./environment/environment.prod";
import { ProductsComponent } from "./products/products.component";
import { ShoppingModule } from "./shopping/shopping.module";
import { AdminAuthGuardService } from "./admin/admin-auth-guard.service";





@NgModule({
  declarations: [
    AppComponent   
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AdminModule,
    ShoppingModule,
    CoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot([
      { path: '', component: ProductsComponent },
      { path: 'login', component: LoginComponent },
    ])    
  ],
  providers: [
    AdminAuthGuardService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { } 