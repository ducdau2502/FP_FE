import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment.prod";
import {Observable} from "rxjs";
import {AccountDetail} from "../model/account-detail";
import {Store} from "../model/store";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private API_ADMIN = environment.API_LOCAL + 'admin/dashboard';

  constructor(private http: HttpClient) { }

  getAllAccount(params: any): Observable<AccountDetail[]> {
    return this.http.get<AccountDetail[]>(this.API_ADMIN + `/list-account`, {params});
  }

  getAllStore(): Observable<Store[]> {
    return this.http.get<Store[]>(this.API_ADMIN + `/list-store`);
  }

  blockStore(id: any): Observable<Store> {
    return this.http.get<Store>(this.API_ADMIN + `/block-store/${id}`);
  }

  findStoreByName(mess: string): Observable<Store[]> {
    let params = new HttpParams().set("name", mess);
    return this.http.get<Store[]>(this.API_ADMIN + `/search-store`, {params});
  }

  findAccountById(id: any): Observable<AccountDetail> {
    return this.http.get<AccountDetail>(this.API_ADMIN + `/detail-account/${id}`);
  }


}
