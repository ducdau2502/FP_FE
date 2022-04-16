import {Component, OnInit} from '@angular/core';
import {HomeService} from "../../../service/home.service";
import {Product} from "../../../model/product";
import {ProductFeedback} from "../../../model/product-feedback";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AccountDetail} from "../../../model/account-detail";
import {TokenStorageService} from "../../../service/auth/token-storage.service";
import {JwtResponse} from "../../../model/response/JwtResponse";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  id = this.tokenStorageService.getUser().id;

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

  constructor(private customerService: HomeService,
              private tokenStorageService: TokenStorageService) {
  }

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.showCustomerBoard = this.roles.includes('ROLE_CUSTOMER');
      this.username = user.username;
    }

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
        id: this.id
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
    this.customerService.getProductImageById(this.idProduct).subscribe((data) => {
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
