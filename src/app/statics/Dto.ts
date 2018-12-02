import { Grocery } from "./Grocery";

export class GroceryDto {
    grocery: Grocery;
    userId: string;
}

export interface ResponseDto<T> {
    value?: T;
    statusText?: string;
    errors?: string;
    isSuccessful?: boolean;
}
