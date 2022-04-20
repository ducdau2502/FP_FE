import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment.prod";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Product} from "../model/product";
import {Observable} from "rxjs";
import {ProductImage} from "../model/product-image";
import {Store} from "../model/store";
import {StoreCategories} from "../model/store-categories";
import {Bill} from "../model/bill";
import {Voucher} from "../model/voucher";
import {RevenueTime} from "../model/response/revenue-time";

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

  //tìm tất cả sản phẩm theo cửa hàng và tên gần đúng
  findAllProductByStoreAndName(id: any, mess: string): Observable<any> {
    let params = new HttpParams().set("search_product", mess);
    return this.http.get<Product[]>(this.API_SELLER + `find-by-name/${id}`, {params});
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
    return this.http.put<Product>(this.API_SELLER + `update/${id}`, product);
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

  getRevenue(id_store: any, revenue: RevenueTime) : Observable<Bill[]>{
    return this.http.post<Bill[]>(this.API_SELLER + `revenue/${id_store}`, revenue);
  }

  getAllRevenue(id_store: any) : Observable<any>{
    return this.http.get<any>(this.API_SELLER + `total-revenue/${id_store}`);
  }

  getVoucher(id_store: any) : Observable<any>{
    return this.http.get<any>(this.API_SELLER + `find-voucher/${id_store}`);
  }

  createVoucher(voucher: Voucher) : Observable<Bill[]> {
    return this.http.post<Bill[]>(this.API_SELLER + `create-voucher`, voucher);
  }

  deleteVoucher(id: any): Observable<any> {
    return this.http.delete(this.API_SELLER + `delete-voucher/${id}`);
  }

  saveStore(id : any, store:Store): Observable<any>{
    return this.http.post(this.API_SELLER + `updateStore/${id}`,store)
  }

}
