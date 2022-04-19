import {AccountDetail} from "./account-detail";
import {Store} from "./store";

export interface StoreRating {
  id?: number;
  level?: number;
  account?: AccountDetail;
  store?: Store;
}
