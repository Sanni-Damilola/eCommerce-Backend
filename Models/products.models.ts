
import { Schema, model } from "mongoose";

import { ProductData } from "./AllInterfaces";

interface Products extends Document, ProductData{};

const ProductSchema: Schema<Products> = new Schema({
    name: {
        type: String,
        required: [true, "Please enter product name"]
    },
    price: {
        type: Number,
        required: [true, "Please enter product price"]
    },
    productImage: {
        type: String,
        required: [true, "Please enter product image"]
    },
    category: {
        type: String,
        required: [true, "Please enter product category e.g Fashion, Food"]
    },
    rating: {
        type: String,
        required: [true, "Please rate this product"]
    },
}, {
    versionKey: false,
    timestamps: true
});

const ProductModel = model<Products>("Products Collection", ProductSchema);

export default ProductModel;