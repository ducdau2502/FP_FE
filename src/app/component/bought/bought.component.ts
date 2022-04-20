import { Component, OnInit } from '@angular/core';
import {CustomerService} from "../../service/customer.service";
import {TokenStorageService} from "../../service/auth/token-storage.service";
import {Bill} from "../../model/bill";

@Component({
  selector: 'app-bought',
  templateUrl: './bought.component.html',
  styleUrls: ['./bought.component.css']
})
export class BoughtComponent implements OnInit {
  id?: number;
  private roles: string[] = [];
  isLoggedIn = false;
  showCustomerBoard = false;
  bills!: Bill[];

  constructor(private customerService: CustomerService,
              private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.showCustomerBoard = this.roles.includes('ROLE_CUSTOMER');
      this.id = user.id;
      this.getAllBill();
    }
  }

  getAllBill() {
    this.customerService.getBills(this.id).subscribe(data => {
      this.bills = data;
    })
  }

}
