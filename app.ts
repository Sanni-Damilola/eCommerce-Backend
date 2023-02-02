import express, { Response, Request, Application, NextFunction } from "express";

import cors from "cors";
import userRoutes from "./Routes/userRoutes";
import morgan from "morgan";

import { AppError, HttpCode } from "./Utils/AppError";
import { ErrorHandler } from "./Middlewares/ErrorHandler/ErrorHandler";

export const AppConfig = (app: Application) => {
  app
    .use(express.json())
    .use(cors())
    .use(morgan("dev"))
    .use("/api", userRoutes);

  // Wrong routes:
  app.all("*", (req: Request, res: Response, next: NextFunction) => {
    next(
      new AppError({
        message: `This route ${req.originalUrl} does not exist`,
        httpCode: HttpCode.NOT_FOUND,
      })
    );
  });

  // Errorhandler should be at the bottom of your code
  app.use(ErrorHandler);
};
