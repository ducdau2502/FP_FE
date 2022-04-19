import { Component, OnInit } from '@angular/core';
import {Store} from "../../../model/store";
import {StoreCategories} from "../../../model/store-categories";
import {HomeService} from "../../../service/home.service";
import {CustomerService} from "../../../service/customer.service";
import {TokenStorageService} from "../../../service/auth/token-storage.service";

@Component({
  selector: 'app-store-like',
  templateUrl: './store-like.component.html',
  styleUrls: ['./store-like.component.css']
})
export class StoreLikeComponent implements OnInit {


  stores!: Store[];
  message: string = '';
  isLoggedIn = false;
  showCustomerBoard = false;
  account_id?: number;
  roles: string[] = [];
  flag: boolean[] = [];

  constructor(private homeService: HomeService,
              private customerService: CustomerService,
              private tokenStorageService: TokenStorageService) {
  }

  ngOnInit() : void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.showCustomerBoard = this.roles.includes('ROLE_CUSTOMER');
      this.account_id = this.tokenStorageService.getUser().id;
      this.getAllStoreFavorite();
    }
  }


  searchStore() {
    if (this.message == "") {
      this.getAllStoreFavorite();
    } else {
      this.homeService.searchStoreByNameContaining(this.message).subscribe(data => {
        this.stores = data;
      })
    }
  }

  saveId(id: any, name: string) {
    localStorage.setItem(name, id);
  }

  likeStore(store_id: any) {
    this.customerService.likeStore(store_id, this.account_id).subscribe(
      () => {
        this.getAllStoreFavorite();
      })
  }

  getAllStoreFavorite() {
    this.customerService.listStoreLike(this.account_id).subscribe((data) => {
      this.stores = data;
      this.flag = [];
      for (let i = 0; i < this.stores.length; i++) {
        this.customerService.checkLikeStore(data[i].id, this.account_id).subscribe((data) => {
          this.flag.push(data);
        })
      }
    })
  }
}
