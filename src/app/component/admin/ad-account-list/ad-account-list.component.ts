import { Component, OnInit } from '@angular/core';
import {AdminService} from "../../../service/admin.service";
import {AccountDetail} from "../../../model/account-detail";

@Component({
  selector: 'app-ad-account-list',
  templateUrl: './ad-account-list.component.html',
  styleUrls: ['./ad-account-list.component.css']
})
export class AdAccountListComponent implements OnInit {

  accounts!: AccountDetail[];

  currentAccount: AccountDetail = {};
  currentIndex = -1;
  fullName = '';
  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9];

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.getAllAccount()
  }

  getRequestParams(searchAccount: string, page: number, pageSize: number): any {
    let params: any = {};
    if (searchAccount) {
      params[`fullName`] = searchAccount;
    }
    if (page) {
      params[`page`] = page - 1;
    }
    if (pageSize) {
      params[`size`] = pageSize;
    }
    return params;
  }

  getAllAccount() {
    const params = this.getRequestParams(this.fullName, this.page, this.pageSize);
    this.adminService.getAllAccount(params).subscribe(
      response => {
        // @ts-ignore
        const { accounts, totalItems } = response;
        this.accounts = accounts;
        this.count = totalItems;
        console.log(response);
      });
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.getAllAccount();
  }
  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.getAllAccount();
  }

  searchFullName(): void {
    this.page = 1;
    this.getAllAccount();
  }

  setActiveTutorial(account: AccountDetail, index: number): void {
    this.currentAccount = account;
    this.currentIndex = index;
  }

  saveId(id: any, name: string) {
    localStorage.setItem(name, id);
  }
}
