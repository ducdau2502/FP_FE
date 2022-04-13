import {Product} from "./product";
import {AccountDetail} from "./account-detail";

export interface ProductFeedback {
  id?: number;
  content?: string;
  accountFeedback?: AccountDetail;
  productFeedback?: Product;
}
