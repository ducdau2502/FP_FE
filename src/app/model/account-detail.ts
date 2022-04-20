import {Account} from "./account";

export interface AccountDetail {
   id?: number;
   fullName?: string;
   age?: number;
   gender?: string;
   address?: string;
   identityCard?: number;
   avatar?: string;
   dateCreate?: Date;
   bankAccount?: number
   status?: string;
   account?: Account;
   roles?: string[];
}
