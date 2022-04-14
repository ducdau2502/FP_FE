import { Component, OnInit } from '@angular/core';
import {AdminServiceService} from "../../../service/admin-service.service";
import {AccountDetail} from "../../../model/account-detail";

@Component({
  selector: 'app-ad-account-detail',
  templateUrl: './ad-account-detail.component.html',
  styleUrls: ['./ad-account-detail.component.css']
})
export class AdAccountDetailComponent implements OnInit {

  private account_detail_id = localStorage.getItem("account_detail_id");

  account!: AccountDetail;

  constructor(private adminService: AdminServiceService) { }

  ngOnInit() {
    this.findAccountById();
  }

  findAccountById() {
    this.adminService.findAccountById(this.account_detail_id).subscribe(data => {
      this.account = data;
    })
  }
}
