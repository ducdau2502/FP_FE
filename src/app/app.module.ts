import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import {ProductListComponent} from "./component/home/product-list/product-list.component";
import { ShopDetailComponent } from './component/home/shop-detail/shop-detail.component';
import {HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatButtonModule} from "@angular/material/button";
import { ProductDetailComponent } from './component/home/product-detail/product-detail.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { StoreListComponent } from './component/home/store-list/store-list.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import {authInterceptorProviders} from "./component/helpers/auth.interceptor";
import {CreateProductComponent} from './component/seller/create-product/create-product.component';
import {environment} from "../environments/environment";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import { SProductListComponent } from './component/seller/s-product-list/s-product-list.component';
import { AdAccountListComponent } from './component/admin/ad-account-list/ad-account-list.component';
import { AdStoreListComponent } from './component/admin/ad-store-list/ad-store-list.component';
import { AdAccountDetailComponent } from './component/admin/ad-account-detail/ad-account-detail.component';
import { EditProductComponent } from './component/seller/edit-product/edit-product.component';
import {NgToastModule} from "ng-angular-popup";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductListComponent,
    FooterComponent,
    ShopDetailComponent,
    ProductDetailComponent,
    StoreListComponent,
    LoginComponent,
    RegisterComponent,
    CreateProductComponent,
    SProductListComponent,
    AdAccountListComponent,
    AdStoreListComponent,
    AdAccountDetailComponent,
    EditProductComponent
  ],

  providers: [authInterceptorProviders],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    NgToastModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
