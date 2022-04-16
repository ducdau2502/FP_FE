import {Store} from "./store";
import {AccountDetail} from "./account-detail";
import {Product} from "./product";
import {Voucher} from "./voucher";

export interface Bill {
    id?: number;
    dateCreate?: Date;
    quantity?: number;
    totalPrice?: number;
    customer?: AccountDetail;
    storeBuy?: Store;
    product?: Product;
    voucher?: Voucher;
}
