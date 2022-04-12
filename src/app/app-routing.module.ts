import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductListComponent} from "./component/customer/product-list/product-list.component";

const routes: Routes = [
  {
    path:"home",
    component: ProductListComponent
  },
  {
    path:"",
    component: ProductListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
