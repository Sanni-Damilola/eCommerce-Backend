import { NextFunction, Request, Response } from "express";
import { IAuthUser } from "../Models/AllInterfaces";

export const isAdmin = async (
  req: IAuthUser,
  res: Response,
  next: NextFunction
) => {
  const user = req!.user;
  const adminUser = user && user.role;
  if (user.role === "admin") {
  }
};
