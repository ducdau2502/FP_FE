import {Store} from "./store";

export interface Voucher {
  id?: number;
  name?: string;
  discount?: number;
  store?: Store
}
