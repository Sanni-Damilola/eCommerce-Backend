import { NextFunction, Request, Response } from "express";
import { AsyncHandler } from "../Utils/AsyncHandler";
import userModel from "../Models/user.models";

// Register Users:
export const RegisterUsers = AsyncHandler(
  async (
    req: Request<{}, {}, IU>, 
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    const { name } = req.body;
  }
);
