import { Component, OnInit } from '@angular/core';
import {HomeService} from "../../../service/home.service";
import {Store} from "../../../model/store";
import {StoreCategories} from "../../../model/store-categories";

@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['./store-list.component.css']
})
export class StoreListComponent implements OnInit {

  stores!: Store[];
  categories!: StoreCategories[];
  message: string = '';

  constructor(private customerService: HomeService) { }

  ngOnInit() {
    this.getAllStore();
    this.getAllCategories();
  }

  getAllStore() {
    this.customerService.getAllStore().subscribe(data => {
      this.stores = data;
    })
  }

  findAllByCategoriesList_Id(id: any) {
    this.customerService.findAllByCategoriesList_Id(id).subscribe(data => {
      this.stores = data;
    })
  }

  getAllCategories() {
    this.customerService.getAllCategories().subscribe(data => {
      this.categories = data;
    })
  }

  topStoreSale() {
    this.customerService.topStoreSale().subscribe(stores => {
      this.stores = stores;
    });
  }


  searchStore() {
      if (this.message == "") {
        this.getAllStore();
      } else {
        this.customerService.searchStoreByNameContaining(this.message).subscribe(data => {
          this.stores = data;
        })
    }
  }

  saveId(id: any, name: string) {
    localStorage.setItem(name, id);
  }
}
