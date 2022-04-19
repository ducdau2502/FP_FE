import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../service/auth/token-storage.service";
import {HomeService} from "../service/home.service";
import {AccountDetail} from "../model/account-detail";
import {CustomerService} from "../service/customer.service";
import {Cart} from "../model/cart";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title = 'FP_FE';
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showSellerBoard = false;
  showCustomerBoard = false;
  username?: string;
  user?: AccountDetail;
  id?: any;

  carts!: Cart[];


  constructor(private tokenStorageService: TokenStorageService,
              private customerService: CustomerService,
              private homeService: HomeService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showSellerBoard = this.roles.includes('ROLE_SELLER');
      this.showCustomerBoard = this.roles.includes('ROLE_CUSTOMER');
      this.username = user.username;
      this.id = user.id;
      this.getAccountDetail();
      this.getAllCart();
    }
  }
  logout(): void {
    this.tokenStorageService.signOut();
    window.location.pathname = "home";
  }

  getAccountDetail() {
    this.homeService.findAccountById(this.id).subscribe(data => {
        this.user = data;
      }
    );
  }

  getAllCart() {
    this.customerService.showCart(this.id).subscribe(data => {
      this.carts = data;
    })
  }

  minusQuantity(product_id: any) {
    this.customerService.minusQuantity(this.id, product_id).subscribe(() => {
      this.getAllCart();
    });
  }

  plusQuantity(product_id: any) {
    this.customerService.plusQuantity(this.id, product_id).subscribe(() => {
      this.getAllCart();
    });
  }
}
