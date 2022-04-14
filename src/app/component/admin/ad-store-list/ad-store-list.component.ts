import { Component, OnInit } from '@angular/core';
import {Store} from "../../../model/store";
import {AdminServiceService} from "../../../service/admin-service.service";

@Component({
  selector: 'app-ad-store-list',
  templateUrl: './ad-store-list.component.html',
  styleUrls: ['./ad-store-list.component.css']
})
export class AdStoreListComponent implements OnInit {

  stores!: Store[];
  message: string = '';

  constructor(private adminService: AdminServiceService) { }

  ngOnInit() {
    this.getAllStore();
  }

  search() {
    if (this.message == "") {
      this.getAllStore();
    } else {
      this.adminService.findStoreByName(this.message).subscribe(data => {
        this.stores = data;
      })
    }
  }

  getAllStore() {
    this.adminService.getAllStore().subscribe(data => {
      this.stores = data;
    })
  }

  blockStore(id: any) {
    this.adminService.blockStore(id).subscribe(() => {
      this.getAllStore();
    })
  }

}
