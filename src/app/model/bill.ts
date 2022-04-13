import {Store} from "./store";
import {AccountDetail} from "./account-detail";

export interface Bill {
    id?: number;
    dateCreate?: Date;
    customer?: AccountDetail;
    storeBuy?: Store;
}
