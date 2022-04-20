import {Component, Input, OnInit} from '@angular/core';
import {Store} from "../../../model/store";
import {HomeService} from "../../../service/home.service";
import {Product} from "../../../model/product";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StoreRating} from "../../../model/store-rating";
import {AccountDetail} from "../../../model/account-detail";
import {Cart} from "../../../model/cart";
import {TokenStorageService} from "../../../service/auth/token-storage.service";
import {CustomerService} from "../../../service/customer.service";

@Component({
  selector: 'app-shop-detail',
  templateUrl: './shop-detail.component.html',
  styleUrls: ['./shop-detail.component.css']
})
export class ShopDetailComponent implements OnInit {
  idStore = localStorage.getItem("store_id");

  store!: Store;
  products!: Product[];
  form: FormGroup;
  ratings!: StoreRating[];
  rate!: StoreRating;

  private roles: string[] = [];
  isLoggedIn = false;
  showCustomerBoard = false;
  username?: string;
  user?: AccountDetail;
  id?: any;

  carts!: Cart[];

  constructor(private customerService: CustomerService,
              private fb: FormBuilder,
              private homeService: HomeService,
              private tokenService: TokenStorageService) {
    this.form = this.fb.group({
      id: [''],
      rating: ['', Validators.required],
    })
  }

  ngOnInit() {
    this.getStoreById()
    this.getProductByStoreId()
    this.getRating()

    this.isLoggedIn = !!this.tokenService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenService.getUser();
      this.roles = user.roles;
      this.showCustomerBoard = this.roles.includes('ROLE_CUSTOMER');
      this.username = user.username;
      this.id = user.id;
    }
  }

  getRating() {
    this.homeService.findRating(this.idStore).subscribe(data => {
      this.ratings = data;
    })
  }

  createRating() {
    this.rate = {
      level: this.form.value.rating,
      account: {
        id: this.id
      },
      store: this.store,
    }
    this.customerService.createRating(this.rate).subscribe( () => {
      this.getRating()
    })
  }

  getStoreById() {
    this.homeService.getStoreById(this.idStore).subscribe(data => {
      this.store = data;
    })
  }

  getProductByStoreId() {
    this.homeService.getAllProductByStoreId(this.idStore).subscribe(data => {
      this.products = data;
    })
  }

  saveId(id: any, name: string) {
    localStorage.setItem(name, id);
  }
}
