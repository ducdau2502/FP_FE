import {AccountDetail} from "./account-detail";
import {Product} from "./product";

export interface Cart {
  id?: number,
  quantity?: number,
  account?: AccountDetail,
  product?: Product
}
