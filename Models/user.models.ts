import { model, Schema, Document } from "mongoose";
import isEmail from "validator/lib/isEmail";
import isAlphanumeric from "validator/lib/isAlphanumeric";

import { IUserData } from "./AllInterfaces";

interface Users extends Document, IUserData {}

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

const userModel = model<Users>("Users Collection", userSchema);

export default userModel;
