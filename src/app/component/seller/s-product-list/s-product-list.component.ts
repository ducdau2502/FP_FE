import { Component, OnInit } from '@angular/core';
import { SellerService } from 'src/app/service/seller.service';
import {Product} from "../../../model/product";
import {Store} from "../../../model/store";
import {ProductImage} from "../../../model/product-image";

@Component({
  selector: 'app-s-product-list',
  templateUrl: './s-product-list.component.html',
  styleUrls: ['./s-product-list.component.css']
})
export class SProductListComponent implements OnInit {
  products: Product[] = [];
  store!: Store;
  productImage!: ProductImage;

  constructor(private sellerService: SellerService) { }

  ngOnInit(): void {
    this.getAllProducts();
    this.getStoreById();
  }

  getStoreById() {
    this.sellerService.getStoreById(3).subscribe(data => {
      this.store = data;
    })
  }

  getProductImage(id: any) {
    this.sellerService.getImageByProductId(id).subscribe(data => {
      this.productImage = data;
    })
  }

  getAllProducts() {
    this.sellerService.findAllProduct(3).subscribe(products => {
      this.products = products;
    })
  }

  deleteProduct(id: any) {
    if (confirm('Are you sure you want to delete this product ?')) {
      this.sellerService.deleteProduct(id).subscribe(() => {
        alert('Delete product successfully');
        this.getAllProducts();
      })
    }
  }

  saveId(id: any, name: string) {
    localStorage.setItem(name, id);
  }
}
