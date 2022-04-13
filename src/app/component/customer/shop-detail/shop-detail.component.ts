import {Component, Input, OnInit} from '@angular/core';
import {Store} from "../../../model/store";
import {CustomerService} from "../../../service/customer.service";
import {Product} from "../../../model/product";

@Component({
  selector: 'app-shop-detail',
  templateUrl: './shop-detail.component.html',
  styleUrls: ['./shop-detail.component.css']
})
export class ShopDetailComponent implements OnInit {
  idStore = localStorage.getItem("store_id");

  store!: Store;
  products!: Product[];

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.getStoreById()
    this.getProductByStoreId()
  }

  getStoreById() {
    this.customerService.getStoreById(this.idStore).subscribe(data => {
      this.store = data;
    })
  }

  getProductByStoreId() {
    this.customerService.getAllProductByStoreId(this.idStore).subscribe(data => {
      this.products = data;
    })
  }

  saveId(id: any, name: string) {
    localStorage.setItem(name, id);
  }
}
