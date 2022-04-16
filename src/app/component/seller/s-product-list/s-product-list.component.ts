import { Component, OnInit } from '@angular/core';
import { SellerService } from 'src/app/service/seller.service';
import {Product} from "../../../model/product";
import {Store} from "../../../model/store";
import {ProductImage} from "../../../model/product-image";
import {HomeService} from "../../../service/home.service";
import {AccountDetail} from "../../../model/account-detail";
import {TokenStorageService} from "../../../service/auth/token-storage.service";
import {FileUpload} from "../../../model/file-upload.model";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {FileUploadService} from "../../../service/file-upload.service";
import {NgToastService} from "ng-angular-popup";
import {StoreCategories} from "../../../model/store-categories";

@Component({
  selector: 'app-s-product-list',
  templateUrl: './s-product-list.component.html',
  styleUrls: ['./s-product-list.component.css']
})
export class SProductListComponent implements OnInit {
  products: Product[] = [];
  productDelete!: Product;
  store!: Store;
  productImage!: ProductImage;
  message: string = '';
  categories!: StoreCategories[];
  user!: AccountDetail;

  selectedFiles?: FileList;
  currentFileUpload?: FileUpload;
  percentage = 0;

  productForm!: FormGroup;

  categoryForm = new FormGroup({
    name: new FormControl("")
  })

  idUser= this.tokenService.getUser().id;

  constructor(private sellerService: SellerService,
              private customerService: HomeService,
              private tokenService: TokenStorageService,
              private uploadService : FileUploadService,
              private toast: NgToastService,
              private fb: FormBuilder,
              private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      id: [''],
      name: [''],
      price: [''],
      inventoryQuantity: [''],
      description: [''],
      coverImage: ['']
    });

    if (!!this.tokenStorageService.getToken()) {
        this.getUser()
    }
  }

  getUser() {
    this.customerService.findAccountById(this.idUser).subscribe(data => {
        this.user = data;
      this.customerService.findStoreByOwnerId(data.id).subscribe(store => {
        this.store = store;
        this.getAllProducts();
        this.getAllCategories();
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
    this.sellerService.findAllProduct(this.store.id).subscribe(products => {
      this.products = products;
    })
  }

  getProductById(id: any) {
    this.customerService.getProductById(id).subscribe(product => {
      this.productDelete = product;
    })
  }

  deleteProduct(id: any) {
      this.sellerService.deleteProduct(id).subscribe(() => {
        this.toast.success({detail:"Successful Message", summary: "Delete Product Successful", duration: 5000})
        this.getAllProducts();
      })
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

    this.sellerService.createProduct(this.store.id, product).subscribe( () => {
      if (product.id == '') {
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

  search() {
    if (this.message == "") {
      this.getAllProducts();
    } else {
      this.customerService.searchProductByNameContaining(this.message).subscribe(data => {
        this.products = data;
      })
    }
  }

  getAllCategories() {
    this.customerService.getAllCategories().subscribe(data => {
      this.categories = data;
    })
  }

  createCategory() {
    const category = {
      name: this.categoryForm.value.name
    }
    this.sellerService.createCategory(category).subscribe(() => {
      this.getAllCategories();
      this.categoryForm.reset();
    })
  }

  saveCategory(id_category: any) {
    this.sellerService.saveCategory(this.store.id, id_category).subscribe(() => {
      this.getUser();
    })
  }

}
