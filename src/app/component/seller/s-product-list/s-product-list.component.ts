import { Component, OnInit } from '@angular/core';
import { SellerService } from 'src/app/service/seller.service';
import {Product} from "../../../model/product";

@Component({
  selector: 'app-s-product-list',
  templateUrl: './s-product-list.component.html',
  styleUrls: ['./s-product-list.component.css']
})
export class SProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private sellerService: SellerService) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.sellerService.findAllProduct(3).subscribe(products => {
      this.products = products;
    })
  }

  deleteProduct(id: any) {
    this.sellerService.deleteProduct(id).subscribe(() => {
      alert('Delete Product Successful');
      this.getAllProducts();
    })
  }
}
