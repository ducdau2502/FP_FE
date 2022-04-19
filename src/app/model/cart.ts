import {AccountDetail} from "./account-detail";
import {Product} from "./product";

export interface Cart {
  id?: number,
  quantity?: number,
  totalPrice?: number,
  account?: AccountDetail,
  product?: Product
}
