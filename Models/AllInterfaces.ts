import { Document, Schema } from "mongoose";

export interface UserData extends Document {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    cart: {
        items: {
            products: Schema.Types.ObjectId;
        };
        quantity: number;
    }[];
};

export interface ProductData extends Document{
    name: string;
    price: number;
    category: string;
    rating: string;
    productImage: string;
}

// https://github.com/adeJoe22/authsystem/tree/master/controllers