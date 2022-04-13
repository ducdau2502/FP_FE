import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import {ProductListComponent} from "./component/customer/product-list/product-list.component";
import { SortByTopSaleComponent } from './component/sort-by-top-sale/sort-by-top-sale.component';
import { ShopDetailComponent } from './component/customer/shop-detail/shop-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductListComponent,
    FooterComponent,
    SortByTopSaleComponent,
    ShopDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
