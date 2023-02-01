import { Category } from "./category";
import { Role } from "./role";

export class Account {
    id!: number;
    username!: string;
    enabled!: boolean;
    password!: String;
    roles!: Role[];
    last_name!: string;
    email!: string;
    address!: string;
    height!: number;
    phone!: string;
    category!: Category[];
    avatar!: any;
    first_name!: string

}
