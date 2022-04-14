import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment.prod";
import {HttpClient} from "@angular/common/http";
import {Product} from "../model/product";
import {Observable} from "rxjs";
import {ProductImage} from "../model/product-image";

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  private API_HOME = environment.API_LOCAL + 'seller/dashboard/';

  constructor(private http : HttpClient) { }

  //tạo sản phẩm
  createProduct(id: any, product: Product): Observable<any> {
    return this.http.post(this.API_HOME + `create-product/${id}`, product);
  }

  //tạo ảnh cho sản phẩm
  createImage(image: ProductImage): Observable<any> {
    return this.http.post(this.API_HOME + `save-image`, image);
  }

  //tìm tất cả sản phẩm theo cửa hàng
  findAllProduct(id: any): Observable<any> {
    return this.http.get(this.API_HOME + id);
  }

  //Xoá sản phẩm
  deleteProduct(id: number): Observable<any> {
    return this.http.delete(this.API_HOME + `delete-product/${id}`);
  }


}
