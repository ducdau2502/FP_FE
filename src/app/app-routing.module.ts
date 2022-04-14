import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductListComponent} from "./component/customer/product-list/product-list.component";
import {ShopDetailComponent} from "./component/customer/shop-detail/shop-detail.component";
import {ProductDetailComponent} from "./component/customer/product-detail/product-detail.component";
import {StoreListComponent} from "./component/customer/store-list/store-list.component";
import { CreateProductComponent } from './component/seller/create-product/create-product.component';

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
  {
    path:"create-product",
    component: CreateProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
