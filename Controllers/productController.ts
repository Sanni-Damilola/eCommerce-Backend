import { Request, Response, NextFunction } from "express";
import ProductModel from "../Models/products.models";
import { AppError, HttpCode } from "../Utils/AppError";
import { AsyncHandler } from "../Utils/AsyncHandler";
import {
  IAddProductToCart,
  IProductData,
  IUserData,
} from "../Models/AllInterfaces";
import userModel from "../Models/user.models";
import { AuthenticatedBody } from "../Models/customInterface";

export const postProduct = AsyncHandler(
  async (
    req: Request<{}, {}, IProductData>,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    const { name, price, productImage, category } = req.body;
    const product = await ProductModel.create({
      name,
      price,
      productImage,
      category,
    });

    if (!product) {
      next(
        new AppError({
          httpCode: HttpCode.BAD_REQUEST,
          message: "Product not created",
        })
      );
    }
    return res.status(201).json({
      message: "Successfully Created A Product",
      date: product,
    });
  }
);
export const getAllProduct = AsyncHandler(
  async (
    req: Request<{}, {}, IProductData>,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    const getAllProduct = await ProductModel.find();

    if (!getAllProduct) {
      next(
        new AppError({
          httpCode: HttpCode.NOT_FOUND,
          message: "Product Not Found",
        })
      );
    }
    return res.status(201).json({
      message: `Successfully Gotten All Product , Length: ${getAllProduct.length}`,
      date: getAllProduct,
    });
  }
);

export const addToCart = AsyncHandler(
  async (
    req: AuthenticatedBody<IAddProductToCart>,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    // const product = await ProductModel.findById(req!.body!._id);
    const user = await userModel.findOne({ email: req!.user!.email });

    if (!user) {
      next(
        new AppError({
          message: "User not found",
          httpCode: HttpCode.NOT_FOUND,
        })
      );
    }
    const doDecrease = req.query.doDecrease === "true";
    const updatedUser = await user!.addToCart(req.body.productId, doDecrease);

    const finalUpdate = {
      user: updatedUser,
    };

    return res.status(200).json({
      data: finalUpdate,
    });
  }
);
