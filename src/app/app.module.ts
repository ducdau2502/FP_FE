import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import {ProductListComponent} from "./component/customer/product-list/product-list.component";
import { ShopDetailComponent } from './component/customer/shop-detail/shop-detail.component';
import {HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatButtonModule} from "@angular/material/button";
import { ProductDetailComponent } from './component/customer/product-detail/product-detail.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { StoreListComponent } from './component/customer/store-list/store-list.component';
import { AdAccountListComponent } from './component/admin/ad-account-list/ad-account-list.component';
import { AdStoreListComponent } from './component/admin/ad-store-list/ad-store-list.component';
import { AdAccountDetailComponent } from './component/admin/ad-account-detail/ad-account-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductListComponent,
    FooterComponent,
    ShopDetailComponent,
    ProductDetailComponent,
    StoreListComponent,
    AdAccountListComponent,
    AdStoreListComponent,
    AdAccountDetailComponent
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        MatTableModule,
        MatButtonModule,
        MatPaginatorModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
