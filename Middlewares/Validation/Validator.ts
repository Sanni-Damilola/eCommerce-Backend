// import { NextFunction } from "express";
// import Joi from "joi";
// import { AppError, HttpCode } from "../../Utils/AppError";

import { object } from "joi";

// export const validation = (
//   schemaName: Joi.ObjectSchema,
//   body: object,
//   next: NextFunction
// ) => {
//   const value = schemaName.validate(body, {
//     allowUnknown: true,
//     abortEarly: false,
//     stripUnknown: true,
//   });

//   try {
//     value.error
//       ? next(
//           new AppError({
//             message: value.error.details[0].message,
//             httpCode: HttpCode.UNPROCESSABLE_IDENTITY,
//           })
//         )
//       : next();
//   } catch (error) {
//     console.log(error);
//   }
// };

export enum HttpCode {
  OK = 3000,
}

interface AppErrorAgrs {
  name?: string;
  message: string;
  httpCode: HttpCode;
  isOperational?: boolean;
}

export class AppError extends Error {
  public readonly httpCode: HttpCode;
  public readonly name: string;
  public readonly isOperational: boolean = true;

  constructor(args: AppErrorAgrs) {
    super(args.message);

    Object.setPrototypeOf(this, new.target.prototype);

    this.name = args.name || "Error";
    this.httpCode = args.httpCode;

    if (args.isOperational !== undefined) {
      this.isOperational = args.isOperational;
    }

    Error.captureStackTrace(this);
  }
}
