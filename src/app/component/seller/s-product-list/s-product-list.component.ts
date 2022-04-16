import { Component, OnInit } from '@angular/core';
import { SellerService } from 'src/app/service/seller.service';
import {Product} from "../../../model/product";
import {Store} from "../../../model/store";
import {ProductImage} from "../../../model/product-image";
import {CustomerService} from "../../../service/customer.service";
import {AccountDetail} from "../../../model/account-detail";
import {FileUpload} from "../../../model/file-upload.model";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {FileUploadService} from "../../../service/file-upload.service";
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-s-product-list',
  templateUrl: './s-product-list.component.html',
  styleUrls: ['./s-product-list.component.css']
})
export class SProductListComponent implements OnInit {
  products: Product[] = [];
  store!: Store;
  productImage!: ProductImage;

  user!: AccountDetail;

  selectedFiles?: FileList;
  currentFileUpload?: FileUpload;
  percentage = 0;

  productForm!: FormGroup;

  idUser= localStorage.getItem("USER_KEY");

  constructor(private sellerService: SellerService,
              private customerService: CustomerService,
              private uploadService : FileUploadService,
              private toast: NgToastService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      id: [''],
      name: [''],
      price: [''],
      inventoryQuantity: [''],
      description: [''],
      coverImage: ['']
    });
    this.getUser();
    this.getAllProducts();
  }

  getUser() {
    this.customerService.findAccountById(this.idUser).subscribe(data => {
        this.user = data;
      this.customerService.findStoreByOwnerId(data.id).subscribe(store => {
        this.store = store;
      })
      }
    );
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
        this.toast.success({detail:"Successful Message", summary: "Delete Product Successful", duration: 5000})
        this.getAllProducts();
      })
    }
  }

  saveId(id: any, name: string) {
    localStorage.setItem(name, id);
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      this.selectedFiles = undefined;
      if (file) {
        this.currentFileUpload = new FileUpload(file);
        this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(percentage => {
          this.percentage = Math.round(percentage ? percentage : 0);

        }, error => {console.log(error);

        });
      }
    }
  }

  submit(): void {
    const product = {
      id: this.productForm.value.id,
      name: this.productForm.value.name,
      price: this.productForm.value.price,
      inventoryQuantity: this.productForm.value.inventoryQuantity,
      description: this.productForm.value.description,
      coverImage: this.currentFileUpload?.url
    };

    this.sellerService.createProduct(3, product).subscribe( () => {
      // alert('Create Product Successful');
      if (product.id == null) {
        this.toast.success({detail:"Successful Message", summary: "Create Product Successful", duration: 5000})
      } else {
        this.toast.success({detail:"Successful Message", summary: "Update Product Successful", duration: 5000})
      }

      this.productForm.reset();
      this.getAllProducts();
    });
  }

  editProduct(id: any) {
    this.sellerService.getProductById(id).subscribe(data => {
      this.productForm.patchValue(data);
    });
    // @ts-ignore
    document.getElementById('exampleModalLabel').innerText = 'Update Product';
  }

}
