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
  userId?: Schema.Types.ObjectId;
  cart?: {
    items: {
      products: Schema.Types.ObjectId;
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
  rating: string;
  productImage: string;
  numberOfReviews: number;
  review: reviewT[];
}

// https://github.com/adeJoe22/authsystem/tree/master/controllers
