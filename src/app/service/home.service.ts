import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment.prod";
import {Observable} from "rxjs";
import {Product} from "../model/product";
import {Store} from "../model/store";
import {ProductFeedback} from "../model/product-feedback";
import {StoreCategories} from "../model/store-categories";
import {ProductImage} from "../model/product-image";
import {AccountDetail} from "../model/account-detail";

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private API_HOME = environment.API_LOCAL + 'home';

  constructor(private http: HttpClient) {
  }

  getAllProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(this.API_HOME + `/showAllProduct`);
  }

  getAllStore(): Observable<Store[]> {
    return this.http.get<Store[]>(this.API_HOME + `/showAllStore`);
  }

  getAllCategories(): Observable<StoreCategories[]> {
    return this.http.get<StoreCategories[]>(this.API_HOME + `/list-category`);
  }

  findAllByCategoriesList_Id(id: any): Observable<Store[]> {
    return this.http.get<Store[]>(this.API_HOME + `/find-store-by-category/${id}`);
  }

  getAllProductByStoreId(id: any): Observable<Product[]> {
    return this.http.get<Product[]>(this.API_HOME + `/${id}`);
  }

  getStoreById(id: any): Observable<Store> {
    return this.http.get<Store>(this.API_HOME + `/find-store/${id}`);
  }

  getProductById(id: any): Observable<Product> {
    return this.http.get<Product>(this.API_HOME + `/find-product/${id}`);
  }

  getFeedbackByIdProduct(id: any): Observable<ProductFeedback[]> {
    return this.http.get<ProductFeedback[]>(this.API_HOME + `/feed-back/${id}`);
  }

  createFeedback(feedback : ProductFeedback): Observable<ProductFeedback> {
    return this.http.post<ProductFeedback>(this.API_HOME + `/feed-back`, feedback);
  }

  countFeedback(id: any): Observable<string> {
    return this.http.get<string>(this.API_HOME + `/feed-back/count-fb/${id}`);
  }

  getProductByPrice(lower: number, upper: number): Observable<Product[]> {
    return this.http.get<Product[]>(this.API_HOME + `/search-products/${lower}/${upper}`);
  }

  getProductImageById(id: any): Observable<ProductImage> {
    return this.http.get<ProductImage>(this.API_HOME + `/get-image/${id}`);
  }

  searchProductByNameContaining(mess: string): Observable<Product[]> {
    let params = new HttpParams().set("name", mess);
    return this.http.get<Product[]>(this.API_HOME + `/search`, {params});
  }

  searchStoreByNameContaining(mess: string): Observable<Product[]> {
    let params = new HttpParams().set("search-store", mess);
    return this.http.get<Product[]>(this.API_HOME + `/search-stores`, {params});
  }

  topStoreSale(): Observable<Store[]> {
    return this.http.get<Store[]>(this.API_HOME + '/top-store-sale')
  }

  topProductSale(): Observable<Product[]> {
    return this.http.get<Product[]>(this.API_HOME + '/top-product-sale');
  }

  findAccountById(id: any): Observable<AccountDetail> {
    return this.http.get<AccountDetail>(this.API_HOME + `/detail-account/${id}`);
  }

  findStoreByOwnerId(id: any): Observable<Store> {
    return this.http.get<Store>(this.API_HOME + `/detail-store/${id}`);
  }

}
