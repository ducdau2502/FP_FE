import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment.prod";
import {HttpClient} from "@angular/common/http";
import {Product} from "../model/product";
import {Observable} from "rxjs";
import {ProductImage} from "../model/product-image";
import {Store} from "../model/store";
import {StoreCategories} from "../model/store-categories";

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  private API_SELLER = environment.API_LOCAL + 'seller/dashboard/';
  private API_HOME = environment.API_LOCAL + 'home';

  constructor(private http : HttpClient) { }

  //tạo sản phẩm
  createProduct(id: any, product: Product): Observable<any> {
    return this.http.post(this.API_SELLER + `create-product/${id}`, product);
  }

  //tạo ảnh cho sản phẩm
  createImage(image: ProductImage): Observable<any> {
    return this.http.post(this.API_SELLER + `save-image`, image);
  }

  //tìm tất cả sản phẩm theo cửa hàng
  findAllProduct(id: any): Observable<any> {
    return this.http.get(this.API_SELLER + id);
  }

  //Xoá sản phẩm
  deleteProduct(id: number): Observable<any> {
    return this.http.delete(this.API_SELLER + `delete-product/${id}`);
  }

  getStoreById(id: any): Observable<Store> {
    return this.http.get<Store>(this.API_HOME + `find-store/${id}`);
  }

  getImageByProductId(id: any): Observable<ProductImage> {
    return this.http.get<ProductImage>(this.API_SELLER + `get-image/${id}`);
  }

  updateProduct(id: any, product: Product): Observable<Product> {
    return this.http.put<Product>(this.API_SELLER + `${id}`, product);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(this.API_SELLER + 'product/' + id);
  }

  createCategory(category: StoreCategories): Observable<StoreCategories> {
    return this.http.post<StoreCategories>(this.API_SELLER + 'create-category', category);
  }

  saveCategory(id_store: any, id_category: any): Observable<StoreCategories> {
    return this.http.get<StoreCategories>(this.API_SELLER + `store/${id_store}/${id_category}`);
  }

}
