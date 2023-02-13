import { Response, Request, NextFunction } from "express";
import { AppError } from "../../Utils/AppError";

const DevErrorHandler = (err: AppError, res: Response) => {
  return res.status(err.httpCode).json({
    httpCode: err.httpCode,
    error: err,
    message: err.message,
    stack: err.stack,
  });
}; // recusive funtions

export const ErrorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  DevErrorHandler(err, res);
};
