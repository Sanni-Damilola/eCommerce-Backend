import { Request } from "express";
import { IUserData } from "./AllInterfaces";

export interface AuthenticatedBody<T> extends Request {
  body: T;
  user?: IUserData;
}
