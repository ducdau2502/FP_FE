import {AccountDetail} from "./account-detail";
import {Store} from "./store";

export interface StoreLike {
  id?: number;
  accountLike?: AccountDetail;
  store?: Store;
}
