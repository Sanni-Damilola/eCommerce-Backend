import { Request } from "express";
import { Document, Schema } from "mongoose";

export interface reviewT {
  user: Schema.Types.ObjectId;
  name: string;
  rating: number;
  comment: string;
}

// user
export interface IUserData extends Document {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  cart?: {
    items: {
      productId: Schema.Types.ObjectId;
    };
    quantity: number;
  }[];
  role: string;
}

// product
export interface IProductData extends Document {
  name: string;
  price: number;
  category: string;
  rating: number;
  productImage: string;
  numberOfReviews: number;
  review: reviewT[];
}

// admin Auth
export interface IAuthUser extends Request {
  user: IUserData;
}

// https://github.com/adeJoe22/authsystem/tree/master/controllers
