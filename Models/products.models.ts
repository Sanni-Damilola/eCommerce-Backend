import { Schema, model } from "mongoose";

import { IProductData } from "./AllInterfaces";

interface Products extends Document, IProductData {}

const ProductSchema: Schema<Products> = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter product name"],
    },
    price: {
      type: Number,
      required: [true, "Please enter product price"],
    },
    productImage: {
      type: String,
      required: [true, "Please enter product image"],
    },
    category: {
      type: String,
      required: [true, "Please enter product category e.g Fashion, Food"],
      enum: [
        "all",
        "men's wear",
        "women's  wear",
        "eletronics",
        "mobile phone",
        "books",
      ],
      message:
        "Please enter category as supplied: all, men's women wear, electronics, book, phone",
      default: "all",
    },
    rating: {
      type: Number,
      default: 0,
    },
    numberOfReviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        user: {
          types: Schema.Types.ObjectId,
          ref: "Users Collection",
          required: true,
        },
        name: { type: String, required: true },
        rating: { type: String, required: true },
        comment: { type: String, required: true },
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const ProductModel = model<Products>("products", ProductSchema);

export default ProductModel;
