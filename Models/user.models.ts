import { model, Schema, Document } from "mongoose";
import isEmail from "validator/lib/isEmail";
import isAlphanumeric from "validator/lib/isAlphanumeric";

import { ICartItems, IUserData } from "./AllInterfaces";

interface Users extends Document, IUserData {
  clearCart(): Promise<void>;
  removeFromCart(productId: string): Promise<void>;
  addToCart(prodID: string, doDecrease: boolean): Promise<boolean>;
}

const userSchema: Schema<Users> = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your name"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      lowercase: true,
      unique: true,
      trim: true,
      validate: [isEmail, "Please provide a valid  email"],
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minlength: 6,
      validate: [isAlphanumeric, "Password must contain alphabeat and number"],
    },
    confirmPassword: {
      type: String,
      required: [true, "Confirm your password"],
      minlength: 6,
    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "user", "manager"],
      message: `Please identify your role as provided: admin, user, manager`,
      default: "user",
    },
    cart: {
      items: [
        {
          productId: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: [true, "Please select a producct"],
          },
          quantity: {
            type: Number,
            required: [true, "Please select a quantity"],
          },
        },
      ],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.methods.addToCart = function (prodID: string, doDecrease: boolean) {
  let cartItemIndex = -1;
  let updateCartItem: ICartItems[] = [];

  if (
    this.cart.items.findIndex(
      (cp: { productId: { toString: () => string } }) => {
        return cp.productId.toString() === prodID.toString();
      }
    )
  ) {
    updateCartItem = [...this.cart.items];
  }

  let newQuantity = 1;
  if (cartItemIndex >= 0) {
    if (doDecrease) {
      newQuantity = this.items[cartItemIndex].quantity - 1;
      if (newQuantity <= 0) {
        return this.removeFromCart(prodID);
      } else {
        newQuantity = this.cart.items[cartItemIndex].quantity + 1;
      }
      updateCartItem[cartItemIndex].quantity = newQuantity;
    }
  } else {
    updateCartItem.push({
      productId: prodID,
      quantity: newQuantity,
    });
  }

  const updateCart = {
    items: updateCartItem,
  };
  this.cart.items = updateCart;
  return this.save({ validateBeforeSave: false });
}; // add to cart

userSchema.methods.removeFromCart = function (productId: string) {
  const updateCart = this.cart.items.filter(
    (items: { productId: { toString: () => string } }) => {
      // deconstruction
      return items.productId.toString() !== productId; // comparing the parameter and delete
    }
  );

  this.cart.items = updateCart;
  return this.save({ validateBeforeSave: false });
}; // remove from cart

userSchema.methods.clearCart = function () {
  this.cart = { items: [] };
  return this.save();
}; // clear cart

const userModel = model<Users>("Users Collection", userSchema);

export default userModel;
