import { NextFunction } from "express";
import Joi from "joi";
import { AppError, HttpCode } from "../../Utils/AppError";

import { object } from "joi";

export const validation = (
  schemaName: Joi.ObjectSchema,
  body: object,
  next: NextFunction
) => {
  const value = schemaName.validate(body, {
    allowUnknown: true,
    abortEarly: false,
    stripUnknown: true,
  });

  try {
    value.error
      ? next(
          new AppError({
            message: value.error.details[0].message,
            httpCode: HttpCode.UNPROCESSABLE_IDENTITY,
          })
        )
      : next();                                    
  } catch (error) {
    console.log(error);
  }
};
