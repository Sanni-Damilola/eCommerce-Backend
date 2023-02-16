import { Request, Response, NextFunction } from "express";
import ProductModel from "../Models/products.models";
import { AppError, HttpCode } from "../Utils/AppError";
import { AsyncHandler } from "../Utils/AsyncHandler";
import { IProductData } from "../Models/AllInterfaces";

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


export const addToCart = AsyncHandler(async(req: Request, res: Response, next: NextFunction):Promise<Response> => {

})