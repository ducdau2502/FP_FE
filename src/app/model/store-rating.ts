import {AccountDetail} from "./account-detail";
import {Store} from "./store";

export interface StoreRating {
  id?: number;
  level?: number;
  accountRating?: AccountDetail;
  storeRating?: Store;
}
