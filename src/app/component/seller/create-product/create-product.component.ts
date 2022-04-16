import { Component, OnInit } from '@angular/core';
import {SellerService} from "../../../service/seller.service";
import {FileUploadService} from "../../../service/file-upload.service";
import {FileUpload} from "../../../model/file-upload.model";
import {FormControl, FormGroup} from "@angular/forms";
import {ProductImage} from "../../../model/product-image";

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  selectedFiles?: FileList;
  currentFileUpload?: FileUpload;
  percentage = 0;

  productForm: FormGroup = new FormGroup({
    name: new FormControl(),
    price: new FormControl(),
    inventoryQuantity: new FormControl(),
    description: new FormControl()
  });

  image!: ProductImage;

  constructor(private sellerService : SellerService,
              private uploadService : FileUploadService) { }

  ngOnInit(): void {
  }

  // selectFile(event: any): void {
  //   this.selectedFiles = event.target.files;
  //   if (this.selectedFiles) {
  //     const file: File | null = this.selectedFiles.item(0);
  //     this.selectedFiles = undefined;
  //     if (file) {
  //       this.currentFileUpload = new FileUpload(file);
  //       this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(percentage => {
  //         this.percentage = Math.round(percentage ? percentage : 0);
  //
  //       }, error => {console.log(error);
  //
  //       });
  //     }
  //   }
  // }
  //
  // submit(): void {
  //   const product = this.productForm.value;
  //   this.sellerService.createProduct(3, product).subscribe( (data) => {
  //     this.image = {
  //       url: this.currentFileUpload?.url,
  //       product: data
  //     }
  //     this.sellerService.createImage(this.image).subscribe();
  //     alert('Create Product Successful');
  //     this.productForm.reset();
  //   });
  // }
}
