import { Request, Response, NextFunction, RequestHandler } from "express";
import { productSchemaValidation } from "./productSchema";
import { validator } from "../Validator";

export const postProductValidation: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  validator(productSchemaValidation.PostProduct, req.body, next);
};
