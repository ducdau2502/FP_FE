import { Component, OnInit } from '@angular/core';
import {CustomerService} from "../../service/customer.service";
import {TokenStorageService} from "../../service/auth/token-storage.service";
import {Cart} from "../../model/cart";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  id?: number;
  private roles: string[] = [];
  isLoggedIn = false;
  showCustomerBoard = false;
  carts!: Cart[];

  constructor(private customerService: CustomerService,
              private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.showCustomerBoard = this.roles.includes('ROLE_CUSTOMER');
      this.id = user.id;
      this.getAllCart();
    }
  }

  getAllCart() {
    this.customerService.showCart(this.id).subscribe(data => {
      this.carts = data;
      console.log(data);
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
