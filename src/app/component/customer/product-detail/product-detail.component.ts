import { Component, OnInit } from '@angular/core';
import {CustomerService} from "../../../service/customer.service";
import {Product} from "../../../model/product";
import {ProductFeedback} from "../../../model/product-feedback";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AccountDetail} from "../../../model/account-detail";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  idProduct = localStorage.getItem("product_id");

  product!: Product;
  feedback!: ProductFeedback;
  feedbacks!: ProductFeedback[];
  countFeedback!: string;
  image?: string;

  fbForm = new FormGroup({
    content: new FormControl('', [Validators.required]),
  })

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.getProductById();
    this.getFeedbackByIdProduct();
    this.countFb();
    this.getImage();
  }

  countFb() {
    this.customerService.countFeedback(this.idProduct).subscribe(data => {
        this.countFeedback = data;
      }
    );
  }

  saveFeedback() {
    const form = this.fbForm.value;
    const fb = {
      content: form.content,
      accountFeedback: {
        id: 1
      },
      productFeedback: this.product
    }
    this.customerService.createFeedback(fb).subscribe(() => {
        this.getFeedbackByIdProduct();
        this.countFb();
        this.fbForm.reset();
      }
    );
  }

  getProductById() {
    this.customerService.getProductById(this.idProduct).subscribe(data => {
      this.product = data;
    })
  }

  getImage() {
    this.customerService.getProductImageById(this.idProduct).subscribe( (data) => {
      this.image = data.url;
    });
    return this.image;
  }

  getFeedbackByIdProduct() {
    this.customerService.getFeedbackByIdProduct(this.idProduct).subscribe(data => {
      this.feedbacks = data;
    })
  }

}
