import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductListComponent} from "./component/customer/product-list/product-list.component";
import {ShopDetailComponent} from "./component/customer/shop-detail/shop-detail.component";
import {ProductDetailComponent} from "./component/customer/product-detail/product-detail.component";
import {StoreListComponent} from "./component/customer/store-list/store-list.component";
import {HomeComponent} from "./component/home/home.component";
import {LoginComponent} from "./component/login/login.component";
import {RegisterComponent} from "./component/register/register.component";
import {CreateProductComponent} from "./component/seller/create-product/create-product.component";
import {AdAccountListComponent} from "./component/admin/ad-account-list/ad-account-list.component";
import {AdAccountDetailComponent} from "./component/admin/ad-account-detail/ad-account-detail.component";
import {AdStoreListComponent} from "./component/admin/ad-store-list/ad-store-list.component";
import { SProductListComponent } from './component/seller/s-product-list/s-product-list.component';
import {EditProductComponent} from "./component/seller/edit-product/edit-product.component";

const routes: Routes = [
  {
    path:"home",
    component: ProductListComponent
  },
  {
    path:"store-list",
    component: StoreListComponent
  },
  {
    path:"store-detail",
    component: ShopDetailComponent
  },
  {
    path:"product-detail",
    component: ProductDetailComponent
  },
  {
    path:"",
    component: ProductListComponent
  },
  //seller
  {
    path:"create-product",
    component: CreateProductComponent
  },
  {
    path: "s-product-list",
    component: SProductListComponent
  },
  {
    path: "update-product/:id",
    component: EditProductComponent
  },
  //admin
  {
    path:"ad-home",
    component: AdAccountListComponent
  },
  {
    path:"ad-store-list",
    component: AdStoreListComponent
  },
  {
    path:"ad-account-detail",
    component: AdAccountDetailComponent
  },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
