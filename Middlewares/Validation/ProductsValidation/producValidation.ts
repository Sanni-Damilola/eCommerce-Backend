import { Request, Response, NextFunction, RequestHandler } from "express";
import { productSchemaValidation } from "./productSchema";
import { validation } from "../Validator";

export const postProductValidation: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  validation(productSchemaValidation.PostProduct, req.body, next);
};
