import {AccountDetail} from "./account-detail";
import {StoreCategories} from "./store-categories";

export interface Store {
  id?: number;
  name?: string;
  description?: string;
  avatar?: string;
  storeOwner?: AccountDetail;
  categoriesList?: StoreCategories;
}
