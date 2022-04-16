import {Component, OnInit} from '@angular/core';
import {Product} from "../../../model/product";
import {HomeService} from "../../../service/home.service";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products!: Product[];
  message: string = '';

  constructor(private customerService: HomeService) {
  }

  ngOnInit() {
    this.getAllProduct();
  }

  search() {
    if (this.message == "") {
      this.getAllProduct();
    } else {
      this.customerService.searchProductByNameContaining(this.message).subscribe(data => {
        this.products = data;
      })
    }
  }

  findProductByPrice(value: string) {
    let lowerPrice = 0;
    let upperPrice = 0;
    switch (value) {
      case "1":
        lowerPrice = 0;
        upperPrice = 500;
        break;
      case "2":
        lowerPrice = 500;
        upperPrice = 1000;
        break;
      case "3":
        lowerPrice = 1000;
        upperPrice = 3000;
        break;
      case "4":
        lowerPrice = 3000;
        upperPrice = 5000;
        break;
      case "5":
        lowerPrice = 5000;
        upperPrice = 999999999999999999000;
        break;
    }
    this.customerService.getProductByPrice(lowerPrice,upperPrice).subscribe(data => {
      this.products = data;
    })
  }

  getAllProduct() {
    this.customerService.getAllProduct().subscribe(data => {
      this.products = data;
    })
  }

  saveId(id: any, name: string) {
    localStorage.setItem(name, id);
  }

  //Hiển thị top sản phẩm được bán nhiều nhất
  topProductSale() {
    this.customerService.topProductSale().subscribe(products => {
      this.products = products;
    });
  }
}
