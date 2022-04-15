import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../service/auth/token-storage.service";

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
  username?: string;
  constructor(private tokenStorageService: TokenStorageService) { }
  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showSellerBoard = this.roles.includes('ROLE_SELLER');
      this.username = user.username;
    }
  }
  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

}
