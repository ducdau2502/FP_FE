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

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.getAllAccount()
  }

  getAllAccount() {
    this.adminService.getAllAccount().subscribe(data => {
      this.accounts = data;
    })
  }

  saveId(id: any, name: string) {
    localStorage.setItem(name, id);
  }
}
