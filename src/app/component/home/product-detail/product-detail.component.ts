import {Component, OnInit} from '@angular/core';
import {HomeService} from "../../../service/home.service";
import {Product} from "../../../model/product";
import {ProductFeedback} from "../../../model/product-feedback";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AccountDetail} from "../../../model/account-detail";
import {TokenStorageService} from "../../../service/auth/token-storage.service";
import {JwtResponse} from "../../../model/response/JwtResponse";
import {CustomerService} from "../../../service/customer.service";
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  id?: number;
  private roles: string[] = [];
  isLoggedIn = false;
  showCustomerBoard = false;

  idProduct = localStorage.getItem("product_id");

  product!: Product;
  feedback!: ProductFeedback;
  feedbacks!: ProductFeedback[];
  countFeedback!: string;
  image?: string;
  username?: string;

  fbForm = new FormGroup({
    content: new FormControl('', [Validators.required]),
  })

  constructor(private homeService: HomeService,
              private customerService: CustomerService,
              private toast: NgToastService,
              private tokenStorageService: TokenStorageService) {
  }

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.showCustomerBoard = this.roles.includes('ROLE_CUSTOMER');
      this.username = user.username;
      this.id = this.tokenStorageService.getUser().id;
    }

    this.getProductById();
    this.getFeedbackByIdProduct();
    this.countFb();
    this.getImage();
  }


  countFb() {
    this.homeService.countFeedback(this.idProduct).subscribe(data => {
        this.countFeedback = data;
      }
    );
  }

  saveFeedback() {
    const form = this.fbForm.value;
    const fb = {
      content: form.content,
      accountFeedback: {
        id: this.id
      },
      productFeedback: this.product
    }
    this.homeService.createFeedback(fb).subscribe(() => {
        this.getFeedbackByIdProduct();
        this.countFb();
        this.fbForm.reset();
      }
    );
  }

  getProductById() {
    this.homeService.getProductById(this.idProduct).subscribe(data => {
      this.product = data;
    })
  }

  getImage() {
    this.homeService.getProductImageById(this.idProduct).subscribe((data) => {
      this.image = data.url;
    });
    return this.image;
  }

  getFeedbackByIdProduct() {
    this.homeService.getFeedbackByIdProduct(this.idProduct).subscribe(data => {
      this.feedbacks = data;
    })
  }

  addCart() {
    this.customerService.addCart(this.id, this.idProduct).subscribe(() => {
      this.toast.success({detail:"Successful Message", summary: "Add Product To Cart Successful", duration: 5000})
    })
  }
}

