import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {SellerService} from "../../../service/seller.service";
import {ActivatedRoute, ParamMap} from "@angular/router";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  productForm: FormGroup = new FormGroup({
    name: new FormControl(),
    price: new FormControl(),
    inventoryQuantity: new FormControl(),
    description: new FormControl()
  });

  id!: number;

  constructor(private sellerService: SellerService,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = parseInt(<string>paramMap.get('id'));
      this.getProduct(this.id);
    });
  }

  ngOnInit(): void {
  }

  getProduct(id: number) {
    this.sellerService.getProductById(id).subscribe(product => {
      this.productForm = new FormGroup({
        name: new FormControl(product.name),
        price: new FormControl(product.price),
        inventoryQuantity: new FormControl(product.inventoryQuantity),
        description: new FormControl(product.description)
      });
    });
  }

  updateProduct(id: number) {
    const product = this.productForm.value;
    this.sellerService.updateProduct(id, product).subscribe(() => {
      alert('Update Product Successful');
      this.productForm.reset();
    });
  }
}
