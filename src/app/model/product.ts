import {Store} from "./store";

export interface Product {
  id?: number;
  name?: string;
  price?: number;
  inventoryQuantity?: number;
  soldQuantity?: number;
  description?: string;
  store?: Store;
}
