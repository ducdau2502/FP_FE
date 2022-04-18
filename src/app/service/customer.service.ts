import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment.prod";
import {Observable} from "rxjs";
import {Product} from "../model/product";
import {AccountDetail} from "../model/account-detail";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private API_CUSTOMER = environment.API_LOCAL + 'customer/dashboard/';

  constructor(private http: HttpClient) { }

  //Thêm sản phẩm vào giỏ hàng
  addCart(account_id: any, product_id: any): Observable<any> {
    // @ts-ignore
    return this.http.post(this.API_CUSTOMER + `cart/${account_id}/${product_id}`);
  }

  //Tăng số lượng trong giỏ hàng
  plusQuantity(account_id: any, product_id: any): Observable<any> {
    // @ts-ignore
    return this.http.post(this.API_CUSTOMER + `plus/${account_id}/${product_id}`);
  }

  //Giảm số lượng trong giỏ hàng
  minusQuantity(account_id: any, product_id: any): Observable<any> {
    // @ts-ignore
    return this.http.post(this.API_CUSTOMER + `minus/${account_id}/${product_id}`);
  }

  //Hiển thị tất cả sản phẩm trong giỏ hàng
  showCart(account_id: any): Observable<any> {
    return this.http.get(this.API_CUSTOMER + `cart/${account_id}`);
  }

  //Xoá sản phẩm trong giỏ hàng
  deleteProduct(account_id: any, product_id: any): Observable<any> {
    return this.http.delete(this.API_CUSTOMER + `cart/${account_id}/${product_id}`);
  }

  //Xoá giỏ hàng
  deleteCart(account_id: any): Observable<any> {
    return this.http.delete(this.API_CUSTOMER + `cart/${account_id}`);
  }
}
