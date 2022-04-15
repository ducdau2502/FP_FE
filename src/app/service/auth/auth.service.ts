import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

const AUTH_API = 'http://localhost:8080/api/auth/account/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }
  login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'sign-in', {
      username,
      password
    }, httpOptions);
  }
  register(username: string,
           email: string,
           password:string,
           fullName:string,
           age : number,
           gender: number,
           address: string,
           identityCard: string,
           avatar: string,
           dateCreate: null,
           bankAccount:number,
           statusName:string):
    Observable<any> {
    return this.http.post(AUTH_API + 'sign-up', {
      username,
      email,
      password,
      fullName,
      age,
      gender,
      address,
      identityCard,
      avatar,
      dateCreate,
      bankAccount,
      statusName
    }, httpOptions);
  }
}
